FROM nginx:1.21-alpine as prod
WORKDIR /etc/nginx

ENV NGINX_HOST=$NGINX_HOST

COPY nginx/prod.conf /etc/nginx/templates/default.conf.template


RUN 