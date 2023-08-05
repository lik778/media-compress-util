FROM copymanager/base-node-app:18.15.0 as build-application
# node:18-alpine

# WORKDIR /home/app/client

# 注意：alpine 版本是基于Alpine系统，不能直接使用curl，安装pnpm可以采用npm安装或安装curl后再使用下面安装pnpm
# node:18.15.0 是基于debian系统可以直接使用curl安装pnpm
# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# COPY package.json pnpm-lock.yaml ./

# RUN pnpm -v && pnpm install --no-frozen-lockfile

# COPY . /home/app/client

# RUN pnpm run build \
#   && rm -rf node_modules \
#   && pnpm prune --prod


FROM nginx:alpine

COPY --from=build-application /home/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD nginx -g "daemon off;"