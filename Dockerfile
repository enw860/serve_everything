FROM node:14.15.4
WORKDIR /usr/src/app

COPY dist ./dist
COPY server ./server
COPY package.json .

LABEL version="1.0"
LABEL maintainer="https://github.com/enw860"

RUN mkdir /usr/src/app/server/database/DB

RUN npm install --production
EXPOSE 8080

CMD [ "npm", "run", "server"]