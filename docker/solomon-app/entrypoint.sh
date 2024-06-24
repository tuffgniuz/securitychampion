#!/bin/sh

# Function to wait for PostgreSQL
wait_for_postgres() {
  echo "Waiting for PostgreSQL to be ready..."
  while ! nc -z solomon-db 5432; do
    sleep 1
  done
  echo "PostgreSQL is ready!"
}

# Wait for PostgreSQL to be ready
wait_for_postgres

# Generate Prisma client
npx prisma generate

# Run the development server
yarn dev

