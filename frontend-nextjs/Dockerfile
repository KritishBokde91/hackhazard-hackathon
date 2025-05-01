FROM node:slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install 
COPY . .

RUN npm run build

EXPOSE 4000
ENV PORT=4000

CMD ["npm", "run", "start"]
