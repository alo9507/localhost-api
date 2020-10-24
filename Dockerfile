FROM node:alpine
WORKDIR "/app"
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
ENV NODE_ENV="dev"
ENV NEO4J_URI="bolt://neo4j:7687"
ENV NEO4J_USER="neo4j"
ENV NEO4J_PASSWORD="neo4j"
ENV NEO4J_ENCRYPTED="false"
CMD ["node", "src/index.js"]