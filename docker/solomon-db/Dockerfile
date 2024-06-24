FROM postgres:16.3-alpine3.20

RUN apk update && apk upgrade

COPY docker/solomon-db/init.sql /docker-entrypoint-initdb.d/

CMD [ "postgres" ]
