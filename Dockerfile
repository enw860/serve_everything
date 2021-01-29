FROM node:14.15.4
WORKDIR /usr/src/app
COPY . .

LABEL version="1.0"
LABEL maintainer="https://github.com/enw860"

RUN mkdir /usr/src/app/server/database/DB

RUN npm i
EXPOSE 8080

CMD [ "npm", "start" ]