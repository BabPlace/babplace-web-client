FROM node:20 as builder

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

# build app
RUN yarn build

CMD ["yarn", "start"]