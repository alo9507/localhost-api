"use strict";

var dotenv = require('dotenv');

var path = require('path');

dotenv.config({
  path: path.resolve(__dirname, ".env.".concat(process.env.NODE_ENV))
});
module.exports = {
  neo4jUri: process.env.NEO4J_URI,
  neo4jUser: process.env.NEO4J_USER,
  neo4jPassword: process.env.NEO4J_PASSWORD,
  neo4jEncrypted: process.env.NEO4J_ENCRYPTED
};