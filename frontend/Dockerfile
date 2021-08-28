# DEVELOPMENT ENVIRONMENT
FROM node:14.17.5-alpine AS dev
WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json /frontend
RUN yarn install

CMD ["yarn", "start"]