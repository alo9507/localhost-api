"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('apollo-fetch'),
    createApolloFetch = _require.createApolloFetch;

var _require2 = require('../graphql/client/mutations'),
    BECOME_VISIBLE_TO = _require2.BECOME_VISIBLE_TO,
    BECOME_INVISIBLE_TO = _require2.BECOME_INVISIBLE_TO,
    BLOCK = _require2.BLOCK,
    CREATE_USER = _require2.CREATE_USER,
    UPDATE_USER = _require2.UPDATE_USER,
    SEND_NOD = _require2.SEND_NOD,
    DELETE_ALL_USERS = _require2.DELETE_ALL_USERS,
    RETURN_NOD = _require2.RETURN_NOD,
    REPORT = _require2.REPORT,
    UPDATE_SHOWME_CRITERIA = _require2.UPDATE_SHOWME_CRITERIA;

var _require3 = require('../graphql/client/queries'),
    GET_USER = _require3.GET_USER,
    GET_USER_FULL = _require3.GET_USER_FULL;

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
  var port = 4001;
  var uri = "http://localhost:".concat(port, "/graphql");
  var apolloFetch = createApolloFetch({
    uri: uri
  });
  var server = createServer(process.env.NEO4J_URI1);
  beforeAll( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return clearDb(process.env.NEO4J_URI1);

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
            return clearDb(process.env.NEO4J_URI1);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
  test('creates a user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var newUserId, input, expectedResponse, variables, result, getUserResult;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            newUserId = "totallynewid";
            input = {
              age: 43,
              bio: "Wannabe policeman",
              email: "me3@g.com",
              id: newUserId,
              isVisible: true,
              name: "Reginald",
              sex: "female",
              whatAmIDoing: "Doing this and that"
            };
            expectedResponse = _objectSpread(_objectSpread({}, input), {}, {
              inbound: [],
              outbound: [],
              mutual: []
            });
            variables = {
              input: input
            };
            _context4.next = 6;
            return apolloFetch({
              query: CREATE_USER,
              variables: variables
            });

          case 6:
            result = _context4.sent;
            expect(result.data.createUser).toEqual(expectedResponse);
            _context4.next = 10;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: newUserId
              }
            });

          case 10:
            getUserResult = _context4.sent;
            expect(result.data.createUser).toEqual(expectedResponse);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));
  test('updates a user', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    var userId, getUserResult, variables, updateUserResult;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return createUsers([mockUsers.john], port);

          case 2:
            userId = "john";
            _context5.next = 5;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: userId
              }
            });

          case 5:
            getUserResult = _context5.sent;
            expect(getUserResult.data.user).toEqual(_objectSpread(_objectSpread({}, mockUsers.john), {}, {
              inbound: [],
              outbound: [],
              mutual: []
            }));
            variables = {
              input: {
                id: userId,
                name: "Not John Anymore"
              }
            };
            _context5.next = 10;
            return apolloFetch({
              query: UPDATE_USER,
              variables: variables
            });

          case 10:
            updateUserResult = _context5.sent;
            expect(updateUserResult.data.updateUser).toEqual(_objectSpread(_objectSpread({}, mockUsers.john), {}, {
              inbound: [],
              outbound: [],
              mutual: [],
              name: "Not John Anymore"
            }));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  })));
  test('sends a nod from one user to another', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var senderId, recipientId, input, variables, sendNodResult, expectedSenderResponse, senderUserResponse, expectedRecipientResponse, recipientUserResponse;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return createUsers([mockUsers.john, mockUsers.jenny], port);

          case 2:
            senderId = "john";
            recipientId = "jenny";
            input = {
              from: senderId,
              to: recipientId,
              message: "nice ass",
              location: "mylocation"
            };
            variables = {
              input: input
            };
            _context6.next = 8;
            return apolloFetch({
              query: SEND_NOD,
              variables: variables
            });

          case 8:
            sendNodResult = _context6.sent;
            expect(sendNodResult.data.sendNod).toEqual(input);
            expectedSenderResponse = _objectSpread(_objectSpread({}, mockUsers.john), {}, {
              inbound: [],
              outbound: [{
                id: "jenny"
              }],
              mutual: []
            });
            _context6.next = 13;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: senderId
              }
            });

          case 13:
            senderUserResponse = _context6.sent;
            expect(senderUserResponse.data.user).toEqual(expectedSenderResponse);
            expectedRecipientResponse = _objectSpread(_objectSpread({}, mockUsers.jenny), {}, {
              inbound: [{
                id: "john"
              }],
              outbound: [],
              mutual: []
            });
            _context6.next = 18;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: recipientId
              }
            });

          case 18:
            recipientUserResponse = _context6.sent;
            expect(recipientUserResponse.data.user).toEqual(expectedRecipientResponse);

          case 20:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  })));
  test('return a nod from one user to another', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    var senderId, recipientId, input, variables, sendNodResult, expectedSenderResponse, senderUserResponse, expectedRecipientResponse, recipientUserResponse, returnNodInput, returnNodResponse, expectedReturnerResponse, returnerUserResponse, expectedInitialSenderResponse, initialSenderUserResponse;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return createUsers([mockUsers.john, mockUsers.jenny], port);

          case 2:
            // SEND A NOD
            senderId = "john";
            recipientId = "jenny";
            input = {
              from: senderId,
              to: recipientId,
              message: "nice ass",
              location: "mylocation"
            };
            variables = {
              input: input
            };
            _context7.next = 8;
            return apolloFetch({
              query: SEND_NOD,
              variables: variables
            });

          case 8:
            sendNodResult = _context7.sent;
            expect(sendNodResult.data.sendNod).toEqual(input);
            expectedSenderResponse = _objectSpread(_objectSpread({}, mockUsers.john), {}, {
              inbound: [],
              outbound: [{
                id: "jenny"
              }],
              mutual: []
            });
            _context7.next = 13;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: senderId
              }
            });

          case 13:
            senderUserResponse = _context7.sent;
            expect(senderUserResponse.data.user).toEqual(expectedSenderResponse);
            expectedRecipientResponse = _objectSpread(_objectSpread({}, mockUsers.jenny), {}, {
              inbound: [{
                id: "john"
              }],
              outbound: [],
              mutual: []
            });
            _context7.next = 18;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: recipientId
              }
            });

          case 18:
            recipientUserResponse = _context7.sent;
            expect(recipientUserResponse.data.user).toEqual(expectedRecipientResponse); // RETURN A NOD

            returnNodInput = {
              from: recipientId,
              to: senderId,
              message: "thx",
              location: "mylocation"
            };
            _context7.next = 23;
            return apolloFetch({
              query: RETURN_NOD,
              variables: {
                input: returnNodInput
              }
            });

          case 23:
            returnNodResponse = _context7.sent;
            expect(returnNodResponse.data.returnNod).toEqual(returnNodInput);
            expectedReturnerResponse = _objectSpread(_objectSpread({}, mockUsers.jenny), {}, {
              inbound: [],
              outbound: [],
              mutual: [{
                id: "john"
              }]
            });
            _context7.next = 28;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: recipientId
              }
            });

          case 28:
            returnerUserResponse = _context7.sent;
            expect(returnerUserResponse.data.user).toEqual(expectedReturnerResponse);
            expectedInitialSenderResponse = _objectSpread(_objectSpread({}, mockUsers.john), {}, {
              inbound: [],
              outbound: [],
              mutual: [{
                id: "jenny"
              }]
            });
            _context7.next = 33;
            return apolloFetch({
              query: GET_USER,
              variables: {
                id: senderId
              }
            });

          case 33:
            initialSenderUserResponse = _context7.sent;
            expect(initialSenderUserResponse.data.user).toEqual(expectedInitialSenderResponse);

          case 35:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));
  test("should fetch unseen inbound nods", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return createAndSendNod([mockUsers.john, mockUsers.jenny], port);

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  })));
  test("should report user", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var reportInput, variables, reportResult;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return createUsers([mockUsers.john, mockUsers.jenny], port);

          case 2:
            reportInput = {
              from: "john",
              to: "jenny",
              reason: "he bit me",
              message: "really bad"
            };
            variables = {
              input: reportInput
            };
            _context9.next = 6;
            return apolloFetch({
              query: REPORT,
              variables: variables
            });

          case 6:
            reportResult = _context9.sent;
            expect(reportResult.data.report).toEqual(reportInput);

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));
  test("should report user", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
    var blockInput, variables, blockResult;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return createUsers([mockUsers.john, mockUsers.jenny], port);

          case 2:
            blockInput = {
              from: "john",
              to: "jenny",
              reason: "he bit me",
              message: "really bad"
            };
            variables = {
              input: blockInput
            };
            _context10.next = 6;
            return apolloFetch({
              query: BLOCK,
              variables: variables
            });

          case 6:
            blockResult = _context10.sent;
            expect(blockResult.data.block).toEqual(blockInput);

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));
  test("should allow becoming invisible to some users", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
    var becomeInvisibleToInput, variables, becomeInvisibleToResult;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return createUsers([mockUsers.john, mockUsers.jenny], port);

          case 2:
            becomeInvisibleToInput = {
              from: "john",
              to: "jenny"
            };
            variables = {
              input: becomeInvisibleToInput
            };
            _context11.next = 6;
            return apolloFetch({
              query: BECOME_INVISIBLE_TO,
              variables: variables
            });

          case 6:
            becomeInvisibleToResult = _context11.sent;
            expect(becomeInvisibleToResult.data.becomeInvisibleTo).toEqual(becomeInvisibleToInput);

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  })));
  test("should allow becoming visible to some users", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
    var becomeInvisibleToInput, becomeInvisibleToInput_variables, becomeInvisibleToResult, becomeVisibleToInput, variables, becomeVisibleToResult;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return createUsers([mockUsers.john, mockUsers.jenny], port);

          case 2:
            becomeInvisibleToInput = {
              from: "john",
              to: "jenny"
            };
            becomeInvisibleToInput_variables = {
              input: becomeInvisibleToInput
            };
            _context12.next = 6;
            return apolloFetch({
              query: BECOME_INVISIBLE_TO,
              variables: becomeInvisibleToInput_variables
            });

          case 6:
            becomeInvisibleToResult = _context12.sent;
            expect(becomeInvisibleToResult.data.becomeInvisibleTo).toEqual(becomeInvisibleToInput);
            becomeVisibleToInput = {
              from: "john",
              to: "jenny"
            };
            variables = {
              input: becomeVisibleToInput
            };
            _context12.next = 12;
            return apolloFetch({
              query: BECOME_VISIBLE_TO,
              variables: variables
            });

          case 12:
            becomeVisibleToResult = _context12.sent;
            expect(becomeVisibleToResult.data.becomeVisibleTo).toEqual(becomeVisibleToInput);

          case 14:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  })));
  test("should update showme criteria", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
    var users, getUserResult, updateShowMeCriteriaInput, variables, updateShowMeCriteriaResult;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return createUsers([mockUsers.john], port);

          case 2:
            users = _context13.sent;
            _context13.next = 5;
            return apolloFetch({
              query: GET_USER_FULL,
              variables: {
                id: users[0].id
              }
            });

          case 5:
            getUserResult = _context13.sent;
            expect(getUserResult.data.user.showMeCriteria).toEqual({
              sex: ["male", "female"],
              age: [18, 100]
            });
            updateShowMeCriteriaInput = {
              id: users[0].id,
              sex: ["male"],
              age: [20, 30]
            };
            variables = {
              input: updateShowMeCriteriaInput
            };
            _context13.next = 11;
            return apolloFetch({
              query: UPDATE_SHOWME_CRITERIA,
              variables: variables
            });

          case 11:
            updateShowMeCriteriaResult = _context13.sent;
            expect(updateShowMeCriteriaResult.data.updateShowMeCriteria).toEqual({
              sex: ["male"],
              age: [20, 30]
            });

          case 13:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  })));
});