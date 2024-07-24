FROM node:alpine3.20 AS builder

WORKDIR /vue-boilerplate

COPY package*.json ./

COPY yarn*.lock ./

RUN yarn install

COPY tailwind.config.js ./

COPY postcss.config.js ./

COPY tsconfig.json ./

COPY tsconfig.node.json ./

COPY vite.config.mts ./

COPY vite-production.config.mts ./

COPY src ./src

COPY public ./public

CMD [ "yarn" ,"start" ]