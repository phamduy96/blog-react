FROM node:lts as builder
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG REACT_APP_BACKEND_PROD
ARG REACT_APP_BACKEND_DEV
ARG NODE_ENV
ENV REACT_APP_BACKEND_PROD=$REACT_APP_BACKEND_PROD
ENV REACT_APP_BACKEND_DEV=$REACT_APP_BACKEND_DEV
ENV NODE_ENV=$NODE_ENV

RUN  npm run build

FROM nginx:stable-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80