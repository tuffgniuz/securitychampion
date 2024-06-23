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

# Apply existing migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed data into the database
npx ts-node prisma/seed.ts

#!/bin/bash

# Run the development server
yarn dev

