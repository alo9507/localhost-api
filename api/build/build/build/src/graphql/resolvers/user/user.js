"use strict";

var _require = require("../../../utils"),
    toNumber = _require.toNumber;

var _require2 = require("../../../utils"),
    generateQuery = _require2.generateQuery;

var user = {
  outbound: function outbound(parent, args, context, info) {
    var session = context.driver.session();
    var params = {
      id: parent.id
    };
    return session.run("\n                MATCH (sender: SocialNode { id: $id })-[r:NODDED_AT]->(recipient: SocialNode)\n                WHERE NOT (recipient)-[:NODDED_AT]->(sender)\n                MATCH (other: User { id: recipient.id })\n                RETURN other", params).then(function (result) {
      session.close();
      return result.records.map(function (record) {
        return record.get('other').properties;
      });
    });
  },
  inbound: function inbound(parent, args, context, info) {
    var session = context.driver.session();
    var params = {
      id: parent.id
    };
    return session.run("\n            MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT]-(sender: SocialNode) \n            WHERE NOT (sender)<-[:NODDED_AT]-(recipient)\n            MATCH (other: User { id: sender.id })\n            RETURN other", params).then(function (result) {
      session.close();
      return result.records.map(function (record) {
        return record.get('other').properties;
      });
    }); // SAVE THIS FOR ES6 UPDATE SO YOU CAN USE OPTIONAL UNWRAPPING
    // if (seen === undefined) {
    //     return session
    //         .run(`
    //     MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT]-(sender: SocialNode) 
    //     WHERE NOT (sender)<-[:NODDED_AT]-(recipient)
    //     MATCH (other: User { id: sender.id })
    //     RETURN other`, params)
    //         .then((result) => {
    //             session.close();
    //             return result.records.map((record) => record.get('other').properties);
    //         });
    // }
    // if (seen === true) {
    //     return session
    //         .run(`
    //         MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT { seen: true }]-(sender: SocialNode) 
    //         WHERE NOT (sender)<-[:NODDED_AT]-(recipient)
    //         MATCH (other: User { id: sender.id })
    //         RETURN other`, params)
    //         .then((result) => {
    //             session.close();
    //             return result.records.map((record) => record.get('other').properties);
    //         });
    // }
    // if (seen === false) {
    //     return session
    //         .run(`
    //             MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT { seen: false }]-(sender: SocialNode) 
    //             WHERE NOT (sender)<-[:NODDED_AT]-(recipient)
    //             MATCH (other: User { id: sender.id })
    //             RETURN other`, params)
    //         .then((result) => {
    //             session.close();
    //             return result.records.map((record) => record.get('other').properties);
    //         });
    // }
  },
  mutual: function mutual(parent, args, context, info) {
    var session = context.driver.session();
    var params = {
      id: parent.id
    };
    return session.run("\n            MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT]-(sender: SocialNode)\n            WITH recipient, sender\n            MATCH (sender)<-[r:NODDED_AT]-(recipient)\n            WITH sender\n            MATCH (other: User { id: sender.id })\n            RETURN other", params).then(function (result) {
      session.close();
      return result.records.map(function (record) {
        return record.get('other').properties;
      });
    });
  },
  showMeCriteria: function showMeCriteria(parent, args, context, info) {
    var session = context.driver.session();
    var params = {
      id: parent.id
    };
    return session.run('MATCH (n: ShowMeCriteria { id: $id }) RETURN n', params).then(function (result) {
      if (result.records == 0) {
        return [];
      }

      session.close();
      return result.records[0].get('n').properties;
    });
  }
};
module.exports = user;