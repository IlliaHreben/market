FROM node:14-alpine
ENV NODE_ENV production
RUN mkdir /market
WORKDIR /market
COPY server server
WORKDIR /market/server
RUN npm ci
CMD node lib/index.js
