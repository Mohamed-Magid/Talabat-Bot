FROM node:14-alpine
   
WORKDIR /talabat-bot

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]