#    ____           ___     
#    / __ \___  ____/ (_)____
#   / /_/ / _ \/ __  / / ___/
#  / _, _/  __/ /_/ / (__  ) 
# /_/ |_|\___/\__,_/_/____/

FROM redis:7.2.4-alpine

COPY containers/redis/redis.conf /usr/local/etc/redis/redis.conf

COPY containers/redis/scripts/start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh

ENTRYPOINT ["start.sh"]
