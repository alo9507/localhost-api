"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('apollo-fetch'),
    createApolloFetch = _require.createApolloFetch;

var createServer = require('../apollo/server');

var _require2 = require('./mocks/seedDbData'),
    names = _require2.names,
    isVisible = _require2.isVisible,
    bios = _require2.bios,
    whatAmIDoings = _require2.whatAmIDoings,
    sex = _require2.sex,
    ages = _require2.ages,
    emails = _require2.emails;

var _require3 = require('../utils'),
    rand = _require3.rand;

var path = require('path');

var dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, "../../.env.".concat(process.env.NODE_ENV))
});
var server = createServer(process.env.NEO4J_URI);
server.listen({
  port: 4001
}).then( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var url, uri, apolloFetch, i, query, variables;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = _ref.url;
            uri = 'http://localhost:4001/graphql';
            apolloFetch = createApolloFetch({
              uri: uri
            });
            i = 0;

          case 4:
            if (!(i < 10)) {
              _context.next = 12;
              break;
            }

            query = "\n                mutation CreateUser($input: CreateUserInput!){\n                    createUser(input: $input ) {\n                        name\n                        id\n                        email\n                        age\n                    }\n            }";
            variables = {
              input: {
                id: i,
                sex: rand(sex),
                name: rand(names),
                email: rand(emails),
                bio: rand(bios),
                whatAmIDoing: rand(whatAmIDoings),
                isVisible: rand(isVisible),
                age: rand(ages)
              }
            };
            _context.next = 9;
            return apolloFetch({
              query: query,
              variables: variables
            });

          case 9:
            i++;
            _context.next = 4;
            break;

          case 12:
            _context.next = 14;
            return server.stop();

          case 14:
            console.log("DB Seeded");
            process.exit(0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());