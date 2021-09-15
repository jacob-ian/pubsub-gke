# DEVELOPMENT ENVIRONMENT
FROM node:14.17.5-alpine AS dev
WORKDIR /email-notifier

ENV PATH /email-notifier/node_modules/.bin:$PATH

COPY package.json /email-notifier/
RUN yarn install

EXPOSE 3002

CMD ["yarn", "dev"]

# Builder
FROM node:14.17.5-alpine AS builder
WORKDIR /email-notifier
COPY . ./
RUN yarn install --frozen-lockfile
RUN yarn build:prod

# Production
FROM node:14.17.5-alpine as prod
WORKDIR /email-notifier
COPY --from=builder /email-notifier/dist ./
COPY --from=builder /email-notifier/package.json ./
RUN yarn install --production --frozen-lockfile
EXPOSE 3002
CMD ["yarn", "start"]