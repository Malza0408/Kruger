FROM node:16.14.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5001
CMD [ "yarn", "start" ]
