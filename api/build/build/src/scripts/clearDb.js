"use strict";

var createDriver = require('../neo4j/driver');

var path = require('path');

var dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, "../../.env.".concat(process.env.NODE_ENV))
});

var clearDb = function clearDb(databaseUri) {
  var promise = new Promise(function (resolve, reject) {
    var session = createDriver(databaseUri).session();
    session.writeTransaction(function (tx) {
      tx.run("MATCH (n) DETACH DELETE n");
    }).then(function (result) {
      session.close();
      resolve();

      if (process.env.CMD_LINE) {
        process.exit(0);
      }
    })["catch"](function (e) {
      console.log("Error clearing DB: ".concat(e));
      reject();

      if (process.env.CMD_LINE) {
        process.exit(-1);
      }
    });
  });
  return promise;
};

clearDb(process.env.NEO4J_URI);
module.exports = clearDb;