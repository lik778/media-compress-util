FROM node:18-alpine as build-application


WORKDIR /app

COPY . .


RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && \
    cnpm install && \
    npm run build

FROM nginx:alpine

COPY --from=build-application /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD nginx -g "daemon off;"