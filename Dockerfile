FROM node:18.19

WORKDIR /app

COPY *.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]