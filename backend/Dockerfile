# DEVELOPMENT ENVIRONMENT
FROM node:14.17.5-alpine AS dev
WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package.json /backend/
RUN yarn install

CMD ["yarn", "dev"]