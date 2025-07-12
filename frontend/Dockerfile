FROM node:20-alpine

WORKDIR /app/frontend

COPY package.json .

RUN npm install

RUN npm i esbuild@0.25.1

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "serve", "-s", "dist" ]