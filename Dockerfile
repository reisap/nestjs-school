FROM node:alpine

WORKDIR /app

COPY package.json /app/
COPY pnpm-lock.yaml /app/

RUN npm i -g pnpm
RUN pnpm install -r

COPY . .

CMD pnpm run start:dev