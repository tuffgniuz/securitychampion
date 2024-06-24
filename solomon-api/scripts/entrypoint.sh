#!/bin/sh

export PYTHONPATH=/app

wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."
  while ! nc -z "$POSTGRES_HOST" 5432; do
    sleep 1
  done
  echo "PostgreSQL is ready!"
}

wait_for_postgres

echo "Postgres is up - executing command"

python scripts/seeder.py

exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
