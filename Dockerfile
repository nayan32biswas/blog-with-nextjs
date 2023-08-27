FROM node:20

RUN mkdir -p /app
WORKDIR /app

ADD package.json yarn.* ./
RUN yarn install

ADD . ./
