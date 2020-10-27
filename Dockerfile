FROM node:alpine
WORKDIR "/app"
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
ENV NODE_ENV="prod"
CMD ["node", "src/index.js"]