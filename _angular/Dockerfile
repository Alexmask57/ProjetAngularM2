FROM node:latest

WORKDIR /_angular

COPY package*.json ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
