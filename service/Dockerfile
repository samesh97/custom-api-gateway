FROM node:18-alpine
WORKDIR /service
COPY package*.json .
RUN npm install --production
COPY src ./src

ENV PORT=5000-6000
CMD ["npm", "run", "prod"]
EXPOSE $PORT