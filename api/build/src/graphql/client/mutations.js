"use strict";

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\nmutation UpdateShowMeCriteria($input: UpdateShowMeCriteriaInput!) {\n    updateShowMeCriteria(input: $input) {\n        sex\n        age\n    }\n}"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\nmutation BecomeInvisibleTo($input: BecomeVisibleToInput!) {\n    becomeVisibleTo(input: $input) {\n        from\n        to\n    }\n}"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\nmutation BecomeInvisibleTo($input: BecomeInvisibleToInput!) {\n    becomeInvisibleTo(input: $input) {\n        from\n        to\n    }\n}"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\nmutation BlockUser($input: BlockInput!) {\n    block(input: $input) {\n        from\n        to\n        reason\n        message\n    }\n}"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\nmutation ReportUser($input: ReportInput!) {\n    report(input: $input) {\n        from\n        to\n        reason\n        message\n    }\n}"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\nmutation DeleteAllUsers {\n    deleteAllUsers {\n        success\n    }\n}"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\nmutation ReturnNod($input: SendNodInput!){\n    returnNod(input: $input ) {\n        from\n        to\n        location\n        message\n    }\n}"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\nmutation SendNod($input: SendNodInput!){\n    sendNod(input: $input ) {\n        from\n        to\n        location\n        message\n    }\n}"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nmutation UpdateUser($input: UpdateUserInput!){\n    updateUser(input: $input ) {\n        id\n        sex\n        name\n        email\n        bio\n        whatAmIDoing\n        isVisible\n        age\n        inbound {\n            id\n        }\n        outbound {\n            id\n        }\n        mutual {\n            id\n        }\n    }\n}"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nmutation CreateUser($input: CreateUserInput!){\n    createUser(input: $input ) {\n        id\n        sex\n        name\n        email\n        bio\n        whatAmIDoing\n        isVisible\n        age\n        inbound {\n            id\n        }\n        outbound {\n            id\n        }\n        mutual {\n            id\n        }\n    }\n}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var gql = require("graphql-tag");

var _require = require('graphql'),
    print = _require.print;

module.exports.CREATE_USER = print(gql(_templateObject()));
module.exports.UPDATE_USER = print(gql(_templateObject2()));
module.exports.SEND_NOD = print(gql(_templateObject3()));
module.exports.RETURN_NOD = print(gql(_templateObject4()));
module.exports.DELETE_ALL_USERS = print(gql(_templateObject5()));
module.exports.REPORT = print(gql(_templateObject6()));
module.exports.BLOCK = print(gql(_templateObject7()));
module.exports.BECOME_INVISIBLE_TO = print(gql(_templateObject8()));
module.exports.BECOME_VISIBLE_TO = print(gql(_templateObject9()));
module.exports.UPDATE_SHOWME_CRITERIA = print(gql(_templateObject10()));