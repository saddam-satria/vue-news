FROM node:alpine3.18 as builder 

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

RUN yarn run build

FROM alpine:3.19 as final

RUN apk add --no-cache --update nginx

WORKDIR /app

COPY public ./public

COPY --from=builder /vue-boilerplate/build ./

ENV DEBUG=false

COPY nginx/nginx.conf /etc/nginx/http.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]