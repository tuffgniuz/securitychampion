FROM python:3.12.4-alpine3.20

WORKDIR /app

# Install dependencies and build tools
RUN apk add --no-cache \
  build-base \
  libffi-dev \
  postgresql-dev \
  musl-dev \
  gcc \
  python3-dev \
  py3-pip \
  py3-virtualenv

# Install pipenv
RUN pip install pipenv

# Copy Pipfile and install dependencies
COPY solomon-api/Pipfile solomon-api/Pipfile.lock ./
RUN pipenv install --deploy --system

# Copy the application files and entrypoint script
COPY solomon-api ./

# RUN chmod +x scripts/entrypoint.sh

ENTRYPOINT ["./scripts/entrypoint.sh"]

