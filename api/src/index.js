const createServer = require("./apollo/server");

createServer().listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});