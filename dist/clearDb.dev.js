"use strict";

var neo4j = require('neo4j-driver');

var keys = require('./keys');

console.log("Running clearDb...");
console.log("Configuring driver to ".concat(keys.NEO4J_URI, "..."));
var driver = neo4j.driver(keys.NEO4J_URI || 'bolt://localhost:7687', neo4j.auth.basic(keys.neo4jUser || 'neo4j', keys.neo4jPassword || 'neo4j'), {
  encrypted: keys.neo4jEncrypted ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF'
});
var session = driver.session();
console.log("Beginning delete transaction");
session.writeTransaction(function (tx) {
  tx.run("MATCH (n) DETACH DELETE n");
}).then(function (result) {
  console.log("Clear successful");
  session.close();
  process.exit(0);
})["catch"](function (e) {
  console.log("Error clearing DB: ".concat(e));
  process.exit(-1);
});