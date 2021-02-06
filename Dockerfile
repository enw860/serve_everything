FROM node:14.15.4-alpine3.12
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY dist ./dist
COPY server ./server
COPY package.json .

LABEL version="1.1"
LABEL maintainer="https://github.com/enw860"

RUN mkdir /usr/src/app/server/database/DB

RUN npm install --only=production
EXPOSE 8080

CMD [ "npm", "run", "server"]