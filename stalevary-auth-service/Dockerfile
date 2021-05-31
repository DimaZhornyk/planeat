FROM node:15
WORKDIR /workspace

COPY package.json yarn.lock /workspace/

RUN apt update
RUN apt -y install gnupg2
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main" | tee  /etc/apt/sources.list.d/pgdg.list
RUN apt update
RUN apt -y install postgresql-client-13

COPY . .
ENV DB_HOST postgres
RUN yarn
RUN yarn build

CMD ["yarn", "start"]