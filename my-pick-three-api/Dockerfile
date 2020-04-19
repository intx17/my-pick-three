FROM node:13.7

RUN npm i -g @nestjs/cli

WORKDIR /workspace
COPY package*.json /workspace/

RUN npm i
CMD [ "npm", "run", "start:dev"]
