FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# install only production deps
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]