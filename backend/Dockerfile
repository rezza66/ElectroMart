FROM node:23-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

ENV NODE_ENV=production

EXPOSE 5004

CMD ["npm", "start"]
