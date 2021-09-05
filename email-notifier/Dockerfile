# DEVELOPMENT ENVIRONMENT
FROM node:14.17.5-alpine AS dev
WORKDIR /email-notifier

ENV PATH /email-notifier/node_modules/.bin:$PATH

COPY package.json /email-notifier//
RUN yarn install

EXPOSE 3001

CMD ["yarn", "dev"]