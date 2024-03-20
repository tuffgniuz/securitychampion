FROM python:3.11.4-alpine

ARG ENVIRONMENT
ARG ENVIRONMENT=${ENVIRONMENT}

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONBUFFERED=1

WORKDIR /app

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash netcat-openbsd figlet \
    rm -rf /var/cache/apk/*

RUN addgroup -g 1000 dev && adduser -D -u 1000 -G dev dev

USER dev

COPY --chown=dev:dev champ-api/Pipfile champ-api/Pipfile.lock /app/
COPY --chown=dev:dev champ-api/scripts/startup.sh /app/scripts/
COPY --chown=dev:dev champ-api/alembic /app/alembic
COPY --chown=dev:dev champ-api/alembic.ini /app/
COPY --chown=dev:dev champ-api/src /app/src

USER root

RUN pip install --upgrade pip
RUN pip install pipenv
RUN pipenv install --system --deploy

USER dev

CMD ["./scripts/startup.sh"]
