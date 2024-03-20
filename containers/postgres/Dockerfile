FROM postgres:16.1-alpine

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

RUN apk update && \
    apk upgrade

CMD ["postgres"]
