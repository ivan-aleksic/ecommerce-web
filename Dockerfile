FROM nginx:stable-alpine3.17

WORKDIR /app

COPY ./dist/angular-ecommerce/ ./
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
