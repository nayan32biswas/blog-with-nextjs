FROM node:20

WORKDIR /app

ADD package.json yarn.* ./
RUN yarn install

ADD . ./
