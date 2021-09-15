# DEVELOPMENT ENVIRONMENT
FROM node:14.17.5-alpine AS dev
WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json /frontend
RUN yarn install

EXPOSE 3001

CMD ["yarn", "start"]

# Builder
FROM node:14.17.5-alpine as builder
WORKDIR /frontend
COPY . /frontend/
RUN yarn install --frozen-lockfile
RUN yarn build

# Production
FROM nginx:1.21 as prod
WORKDIR /www
COPY --from=builder /frontend/build/ ./
COPY --from=builder /frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000