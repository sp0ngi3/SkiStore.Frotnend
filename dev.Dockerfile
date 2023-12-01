FROM node:lts-alpine3.18 as builder

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev"]
