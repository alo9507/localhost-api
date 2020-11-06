const server = require("./apollo/server");

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});