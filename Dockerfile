# syntax=docker/dockerfile:1.7
FROM node:current-alpine as builder

WORKDIR /tsoa-htmx-demo

# Install base dependencies
RUN npm install -g npm@10.x.x

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci
COPY . .
RUN npm run build

# service
FROM node:current-alpine as service

WORKDIR /tsoa-htmx-demo

RUN apk add --update coreutils
RUN npm -g install npm@10.x.x

COPY package*.json ./
RUN npm ci --omit-dev

COPY --from=builder /tsoa-htmx-demo/build ./build

EXPOSE 80
CMD [ "npm", "start" ]
