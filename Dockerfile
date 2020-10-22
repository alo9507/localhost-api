FROM node:alpine
WORKDIR "/app"
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
ENV NODE_ENV="dev"
CMD ["node", "src/index.js"]