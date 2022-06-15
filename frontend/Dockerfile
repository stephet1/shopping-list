FROM node:alpine
COPY . /frontend
COPY package.json /frontend
COPY package-lock.json /frontend
WORKDIR /frontend


RUN npm install
CMD ["npm","run","start"]