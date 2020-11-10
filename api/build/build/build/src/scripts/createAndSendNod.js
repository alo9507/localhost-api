"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var _require = require('apollo-fetch'),
    createApolloFetch = _require.createApolloFetch;

var clearDb = require("./clearDb");

var _require2 = require('../graphql/client/mutations'),
    CREATE_USER = _require2.CREATE_USER,
    SEND_NOD = _require2.SEND_NOD;

function createAndSendNod(_x, _x2) {
  return _createAndSendNod.apply(this, arguments);
}

function _createAndSendNod() {
  _createAndSendNod = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(users, port) {
    var uri, apolloFetch, promise;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = "http://localhost:".concat(port, "/graphql");
            apolloFetch = createApolloFetch({
              uri: uri
            });
            promise = new Promise( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                var _variables, input, variables, sendNodResult;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = regeneratorRuntime.keys(users);

                      case 1:
                        if ((_context.t1 = _context.t0()).done) {
                          _context.next = 8;
                          break;
                        }

                        name = _context.t1.value;
                        _variables = {
                          input: users[name]
                        };
                        _context.next = 6;
                        return apolloFetch({
                          query: CREATE_USER,
                          variables: _variables
                        });

                      case 6:
                        _context.next = 1;
                        break;

                      case 8:
                        ;

                        if (!(users.length != 2)) {
                          _context.next = 11;
                          break;
                        }

                        throw new Error("Needs 2 users");

                      case 11:
                        input = {
                          from: users[0],
                          to: users[1],
                          message: "nice ass",
                          location: "mylocation"
                        };
                        variables = {
                          input: input
                        };
                        _context.next = 15;
                        return apolloFetch({
                          query: SEND_NOD,
                          variables: variables
                        });

                      case 15:
                        sendNodResult = _context.sent;
                        _context.next = 18;
                        return apolloFetch({
                          query: SEND_NOD,
                          variables: variables
                        });

                      case 18:
                        resolve();

                      case 19:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3, _x4) {
                return _ref.apply(this, arguments);
              };
            }());
            return _context2.abrupt("return", promise);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createAndSendNod.apply(this, arguments);
}

module.exports = createAndSendNod;