"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('apollo-fetch'),
    createApolloFetch = _require.createApolloFetch;

var _require2 = require('../graphql/client/mutations'),
    UPDATE_SHOWME_CRITERIA = _require2.UPDATE_SHOWME_CRITERIA;

var _require3 = require('../graphql/client/queries'),
    GET_VIABLE_USERS = _require3.GET_VIABLE_USERS;

var clearDb = require('../scripts/clearDb');

var mockUsers = require("../scripts/mocks/mockUsers");

var createUsers = require("../scripts/createUsers");

var createAndSendNod = require("../scripts/createAndSendNod");

var createServer = require("../apollo/server");

var path = require('path');

var dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, "../../.env.".concat(process.env.NODE_ENV))
});
describe("Integration Test mutations", function () {
  var port = 4002;
  var uri = "http://localhost:".concat(port, "/graphql");
  var apolloFetch = createApolloFetch({
    uri: uri
  });
  var server = createServer(process.env.NEO4J_URI2);
  beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return clearDb(process.env.NEO4J_URI2);

          case 2:
            _context.next = 4;
            return server.listen({
              port: port
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  afterAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return server.stop();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return clearDb(process.env.NEO4J_URI2);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test("should fetch only viable users according to user visibility and showmecriteria", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var users, updateShowMeCriteriaInput, variables, updateShowMeCriteriaResult, viableUsersResult;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return createUsers([mockUsers.john, mockUsers.male_25_visible, mockUsers.male_25_invisible, mockUsers.male_40_visible, mockUsers.female_25_visible, mockUsers.female_25_invisible, mockUsers.female_40_visible], port);

          case 2:
            users = _context4.sent;
            updateShowMeCriteriaInput = {
              id: "john",
              sex: ["male"],
              age: [20, 30]
            };
            variables = {
              input: updateShowMeCriteriaInput
            };
            _context4.next = 7;
            return apolloFetch({
              query: UPDATE_SHOWME_CRITERIA,
              variables: variables
            });

          case 7:
            updateShowMeCriteriaResult = _context4.sent;
            expect(updateShowMeCriteriaResult.data.updateShowMeCriteria).toEqual({
              sex: ["male"],
              age: [20, 30]
            });
            _context4.next = 11;
            return apolloFetch({
              query: GET_VIABLE_USERS,
              variables: {
                id: "john"
              }
            });

          case 11:
            viableUsersResult = _context4.sent;
            expect(viableUsersResult.data.getViableUsers).toBe([mockUsers.male_25_visible]);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
});