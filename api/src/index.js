const createServer = require("./apollo/server");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

createServer(process.env.NEO4J_URI).listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});