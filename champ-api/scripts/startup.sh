#!/bin/sh
cd /app || exit

figlet "Waiting for postgres..."

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done

figlet "Postgres is ready"

figlet "Migrating"

figlet "Serving Champ API"
exec uvicorn src.app:app --host 0.0.0.0 --port 8000 --reload
