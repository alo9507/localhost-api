"use strict";

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\nquery GetViableUsers($id: ID!){\n    getViableUsers(id: $id) {\n        id\n    }\n}"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nquery GetUser($id: ID!){\n    user(id: $id) {\n        id\n        sex\n        name\n        email\n        bio\n        whatAmIDoing\n        isVisible\n        age\n        inbound {\n            id\n        }\n        outbound {\n            id\n        }\n        mutual {\n            id\n        }\n        showMeCriteria {\n            sex\n            age\n        }\n    }\n}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nquery GetUser($id: ID!){\n    user(id: $id) {\n        id\n        sex\n        name\n        email\n        bio\n        whatAmIDoing\n        isVisible\n        age\n        inbound {\n            id\n        }\n        outbound {\n            id\n        }\n        mutual {\n            id\n        }\n    }\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var gql = require("graphql-tag");

var _require = require('graphql'),
    print = _require.print;

module.exports.GET_USER = print(gql(_templateObject()));
module.exports.GET_USER_FULL = print(gql(_templateObject2()));
module.exports.GET_VIABLE_USERS = print(gql(_templateObject3()));