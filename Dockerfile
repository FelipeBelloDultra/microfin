FROM node:20-slim

RUN \
  apt update -y && \
  apt install -y openssl

WORKDIR /home/node/app

USER node

CMD [ "tail", "-f", "/dev/null" ]
