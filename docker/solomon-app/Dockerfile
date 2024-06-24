# Dockerfile
FROM node:22-alpine3.20

WORKDIR /app

RUN apk update && \
  apk upgrade


# Copy package.json and yarn.lock before installing dependencies
COPY solomon-ui/package.json solomon-ui/yarn.lock ./

# Install dependencies, including ts-node
RUN yarn global add ts-node && yarn install

# Copy application files with correct ownership
COPY solomon-ui .

# Copy the entrypoint script and make it executable
COPY docker/nodejs/entrypoint.sh /usr/local/bin/entrypoint.sh

# Expose port
EXPOSE 3000

# Set entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
