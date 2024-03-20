#!/bin/sh
# Use environment variables to set the redis.conf
sed -i "s/# requirepass .*/requirepass ${REDIS_PASSWORD}/" /usr/local/etc/redis/redis.conf

# Start Redis with the modified configuration
exec redis-server /usr/local/etc/redis/redis.conf
