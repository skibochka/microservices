FROM node:12

ARG TOKEN

WORKDIR /usr/src/app

ENV NPM_TOKEN=$TOKEN

COPY . .

RUN npm install

CMD [ "npm", "run", "start:dev" ]