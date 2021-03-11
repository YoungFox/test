FROM node:current-alpine3.12


WORKDIR /opt/test
COPY . /opt/test

ENTRYPOINT [ "./entrypoint.sh" ]
# CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
