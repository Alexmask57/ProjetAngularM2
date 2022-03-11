FROM node:latest

WORKDIR /

COPY package*.json ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
