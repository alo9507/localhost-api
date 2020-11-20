FROM node:alpine
WORKDIR "/app"
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV="prod"
EXPOSE 4001
CMD ["node", "src/index.js"]