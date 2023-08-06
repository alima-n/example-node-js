FROM debian

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs npm

WORKDIR /app/backend
COPY package*.json ./

RUN npm install
COPY . .

ENV MONGO_URI=mongodb://db:27017/node-js-example

EXPOSE 3000

CMD ["npm", "start"]

