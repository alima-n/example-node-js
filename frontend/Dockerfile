FROM node:lts-alpine

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
