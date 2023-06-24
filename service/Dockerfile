FROM node:18-alpine
WORKDIR /service
COPY package*.json .
RUN npm install --production
COPY src ./src
CMD ["npm", "run", "prod"]
EXPOSE 5001