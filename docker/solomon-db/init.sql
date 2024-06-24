-- Create a new user
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'regular_user') THEN
        CREATE USER regular_user WITH PASSWORD 'regularpassword';
    END IF;
END
$$;

-- Create a new database if it doesn't exist
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'devdb') THEN
        CREATE DATABASE devdb;
    END IF;
END
$$;

-- Connect to the new database
\connect devdb;

-- Create the Category table
CREATE TABLE IF NOT EXISTS category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_key VARCHAR UNIQUE NOT NULL, -- category_id in the asvs.json
    name VARCHAR NOT NULL,
    summary VARCHAR NOT NULL
);

-- Create the SubCategory table
CREATE TABLE IF NOT EXISTS sub_category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_category_key VARCHAR UNIQUE NOT NULL, -- sub_category_id in the asvs.json
    name VARCHAR NOT NULL,
    summary VARCHAR,
    category_id UUID,
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(id)
);

-- Create the Requirement table
CREATE TABLE IF NOT EXISTS requirement (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requirement_key VARCHAR UNIQUE NOT NULL, -- requirement_id in the asvs.json
    description VARCHAR NOT NULL,
    level1 BOOLEAN NOT NULL,
    level2 BOOLEAN NOT NULL,
    level3 BOOLEAN NOT NULL,
    -- cwe VARCHAR NOT NULL,
    sub_category_id UUID,
    CONSTRAINT fk_sub_category FOREIGN KEY(sub_category_id) REFERENCES sub_category(id)
);

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE devdb TO regular_user;
