FROM node:18-alpine as builder
WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.19.0
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /code/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]


