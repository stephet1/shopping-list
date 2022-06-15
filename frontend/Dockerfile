FROM node:alpine
COPY . /client
COPY package.json /client
COPY package-lock.json /client
WORKDIR /client


RUN npm install
CMD ["npm","run","start"]