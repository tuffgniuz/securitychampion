import json
import logging
import os
import uuid
from typing import Any

import psycopg2
from psycopg2.extensions import connection, cursor
from psycopg2.extras import execute_values

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


def get_data() -> list[dict[str, Any]]:
    """
    Fetches data from asvs.json file.

    Returns:
        List[Dict[str, Any]]: A list of dictionaries representing the data.
    """
    logging.info("Fetching data from asvs.json")
    file_path = os.path.join(os.path.dirname(__file__), "asvs.json")
    with open(file_path) as file:
        return json.load(file)


def connect_db() -> connection:
    """
    Connects to the PostgreSQL database using environment variables.

    Returns:
        connection: A psycopg2 connection object.
    """
    logging.info("Connecting to PostgreSQL database")
    return psycopg2.connect(
        dbname=os.getenv("POSTGRES_DB"),
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD"),
        host=os.getenv("POSTGRES_HOST"),
    )


def insert_categories(cur: cursor, data: list[dict[str, Any]]) -> dict[str, str]:
    """
    Inserts categories into the database and returns a mapping of category keys to UUIDs.

    Args:
        cur (cursor): The database cursor.
        data (List[Dict[str, Any]]): The data to be inserted.

    Returns:
        Dict[str, str]: A mapping of category keys to their UUIDs.
    """
    category_id_map = {}
    for item in data:
        category_uuid = str(uuid.uuid4())
        cur.execute(
            """
            INSERT INTO category (id, category_key, name, summary)
            VALUES (%s, %s, %s, %s)
            """,
            (
                category_uuid,
                item["category_id"],
                item["category_name"],
                item["summary"],
            ),
        )
        category_id_map[item["category_id"]] = category_uuid
        logging.info(f"Inserted category {item['category_name']}")
    return category_id_map


def insert_sub_categories_and_requirements(
    cur: cursor, data: list[dict[str, Any]], category_id_map: dict[str, str]
) -> None:
    """
    Inserts sub-categories and requirements into the database.

    Args:
        cur (cursor): The database cursor.
        data (List[Dict[str, Any]]): The data to be inserted.
        category_id_map (Dict[str, str]): A mapping of category keys to UUIDs.
    """
    for item in data:
        for sub_category in item["sub_categories"]:
            sub_category_uuid = str(uuid.uuid4())
            cur.execute(
                """
                INSERT INTO sub_category (id, sub_category_key, name, summary, category_id)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (sub_category_key) DO NOTHING
                """,
                (
                    sub_category_uuid,
                    sub_category["sub_category_id"],
                    sub_category["sub_category_name"],
                    sub_category.get("summary", ""),
                    category_id_map[item["category_id"]],
                ),
            )

            requirement_data = [
                (
                    str(uuid.uuid4()),
                    req["requirement_id"],
                    req["description"],
                    req["level1"],
                    req["level2"],
                    req["level3"],
                    sub_category_uuid,
                )
                for req in sub_category["requirements"]
            ]
            execute_values(
                cur,
                """
                INSERT INTO requirement (id, requirement_key, description, level1, level2, level3, sub_category_id)
                VALUES %s
                ON CONFLICT (requirement_key) DO NOTHING
                """,
                requirement_data,
            )
            logging.info(
                f"Inserted requirements for sub_category {sub_category['sub_category_id']}"
            )


def seed_data(data: list[dict[str, Any]]) -> None:
    """
    Seeds the database with the provided data.

    Args:
        data (List[Dict[str, Any]]): The data to be inserted into the database.
    """
    try:
        with connect_db() as conn:
            with conn.cursor() as cur:
                logging.info("Successfully connected to PostgreSQL database")
                category_id_map = insert_categories(cur, data)
                insert_sub_categories_and_requirements(cur, data, category_id_map)
                conn.commit()
                logging.info("Seeding completed successfully")
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        raise


if __name__ == "__main__":
    logging.info("Starting the seeding process")
    data = get_data()
    seed_data(data)
    logging.info("Seeding process finished - exiting now")
