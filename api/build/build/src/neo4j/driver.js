"use strict";

var neo4j = require('neo4j-driver');

var path = require('path');

var dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, "../../.env.".concat(process.env.NODE_ENV))
});

function createDriver(neo4jURI) {
  var driver = neo4j.driver(neo4jURI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD), {
    encrypted: 'ENCRYPTION_OFF',
    disableLosslessIntegers: true
  });
  return driver;
}

module.exports = createDriver;