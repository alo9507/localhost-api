"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('apollo-fetch'),
    createApolloFetch = _require.createApolloFetch;

var clearDb = require("./clearDb");

var _require2 = require('../graphql/client/mutations'),
    CREATE_USER = _require2.CREATE_USER,
    UPDATE_USER = _require2.UPDATE_USER,
    SEND_NOD = _require2.SEND_NOD;

function createUsers(_x, _x2) {
  return _createUsers.apply(this, arguments);
}

function _createUsers() {
  _createUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(users, port) {
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
                var variables;
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
                        variables = {
                          input: users[name]
                        };
                        _context.next = 6;
                        return apolloFetch({
                          query: CREATE_USER,
                          variables: variables
                        });

                      case 6:
                        _context.next = 1;
                        break;

                      case 8:
                        ;
                        resolve(users);

                      case 10:
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
  return _createUsers.apply(this, arguments);
}

module.exports = createUsers;