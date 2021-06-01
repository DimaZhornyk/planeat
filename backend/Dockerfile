FROM node:15
WORKDIR /workspace

COPY package.json yarn.lock /workspace/

RUN apt update

COPY . .

RUN yarn
RUN yarn build

CMD ["yarn", "start"]