# DEVELOPMENT ENVIRONMENT
FROM node:14.17.5-alpine AS dev
WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package.json /backend/
RUN yarn install

EXPOSE 3001

CMD ["yarn", "dev"]

# Builder
FROM node:14.17.5-alpine AS builder
WORKDIR /backend
COPY . ./
RUN yarn install --frozen-lockfile
RUN yarn build:prod

# Production
FROM node:14.17.5-alpine as prod
WORKDIR /backend
COPY --from=builder /backend/dist ./
COPY --from=builder /backend/package.json ./
RUN yarn install --production --frozen-lockfile
EXPOSE 3001
CMD ["yarn", "start"]