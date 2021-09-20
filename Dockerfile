FROM node:14.17.3
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/local/pakket-backend
COPY package.json yarn.lock ./

RUN apt-get install g++ gcc libstdc++ libc6 make python
RUN npm install -g node-gyp rimraf

RUN yarn install

COPY . ./
RUN yarn prisma:generate:local
RUN yarn build

EXPOSE 80
CMD [ "yarn", "start" ]
