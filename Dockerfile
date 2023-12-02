FROM node:18.12.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm test
EXPOSE 8081
CMD ["npm", "start"] 