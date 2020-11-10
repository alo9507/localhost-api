"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require("../../../utils"),
    toNumber = _require.toNumber;

var _require2 = require("../../../utils"),
    generateQuery = _require2.generateQuery;

var mutations = {
  sendNod: function sendNod(parent, args, context) {
    var _args$input2;

    var session = context.driver.session();
    var _args$input = args.input,
        from = _args$input.from,
        to = _args$input.to,
        message = _args$input.message,
        location = _args$input.location;
    var params = {
      from: from,
      to: to,
      message: (_args$input2 = args.input) === null || _args$input2 === void 0 ? void 0 : _args$input2.message,
      location: location === undefined ? "" : location
    };
    return session.run("MATCH (a: SocialNode),(b: SocialNode) \n                WHERE a.id = $from AND b.id = $to \n                CREATE (a)-[r:NODDED_AT { initiator: true, seen: false, createdAt: timestamp(), message: $message, location: $location }]->(b) \n                RETURN a.id, b.id, $message, $location", params).then(function (result) {
      session.close();
      return {
        from: result.records[0].get('a.id'),
        to: result.records[0].get('b.id'),
        message: result.records[0].get('$message'),
        location: result.records[0].get('$location')
      };
    });
  },
  returnNod: function returnNod(parent, args, context) {
    var session = context.driver.session();
    var _args$input3 = args.input,
        from = _args$input3.from,
        to = _args$input3.to,
        message = _args$input3.message,
        location = _args$input3.location;
    var params = {
      from: from,
      to: to,
      message: message === undefined ? "" : message,
      location: location === undefined ? "" : location
    };
    return session.run("MATCH (a: SocialNode),(b: SocialNode) \n                WHERE a.id = $from AND b.id = $to \n                CREATE (a)-[r:NODDED_AT { initiator: false, seen: false, createdAt: timestamp(), message: $message, location: $location }]->(b) \n                RETURN a.id, b.id, $message, $location", params).then(function (result) {
      session.close();
      return {
        from: result.records[0].get('a.id'),
        to: result.records[0].get('b.id'),
        message: result.records[0].get('$message'),
        location: result.records[0].get('$location')
      };
    });
  },
  nodSeen: function nodSeen(parent, args, context) {
    var session = context.driver.session();
    var params = {
      recipient: args.recipient,
      sender: args.sender
    };
    return session.run('MATCH (a: SocialNode { id: $sender } )-[r:NODDED_AT]->(b: SocialNode { id: $recipient } ) SET r.seen = true RETURN $recipient, $sender', params).then(function (result) {
      session.close();
      return {
        sender: result.records[0].get('$sender'),
        recipient: result.records[0].get('$recipient')
      };
    });
  },
  deleteAllUsers: function deleteAllUsers(parent, args, context) {
    var session = context.driver.session();
    return session.run('MATCH (n) DETACH DELETE n').then(function (result) {
      session.close();
      return "Succesfully deleted all users";
    });
  },
  updateUser: function updateUser(parent, args, context) {
    var session = context.driver.session();
    var params = {
      id: args.input.id,
      input: args.input
    };
    return session.run('MATCH (n: User { id: $id }) SET n += $input RETURN n', params).then(function (result) {
      session.close();
      return result.records[0].get(0).properties;
    });
  },
  // session.run('MERGE (n: ShowMeCriteria { id: $id }) ON CREATE SET n += $input ON CREATE SET n.sex = ["male", "female"] RETURN n', params)
  createUser: function createUser(parents, args, context) {
    var session = context.driver.session();
    var params = {
      id: args.input.id,
      input: args.input
    };
    var txc = session.beginTransaction();
    var promise = new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
        var userResult, user, showMeCriteriaResult, socialNodeResult;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return txc.run('MERGE (n:User { id: $id }) ON CREATE SET n.created = timestamp(), n += $input RETURN n', params);

              case 3:
                userResult = _context.sent;
                user = userResult.records[0].get(0).properties;
                _context.next = 7;
                return txc.run("\n                MERGE (showmecriteria: ShowMeCriteria { id: $id }) \n                ON CREATE SET showmecriteria.sex = [\"male\", \"female\"], showmecriteria.age = [18, 100]\n                RETURN showmecriteria", params);

              case 7:
                showMeCriteriaResult = _context.sent;
                _context.next = 10;
                return txc.run('MERGE (socialNode: SocialNode { id: $id }) RETURN socialNode', params);

              case 10:
                socialNodeResult = _context.sent;
                txc.commit();
                resolve(user);
                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](0);
                reject(_context.t0);
                txc.rollback();

              case 19:
                _context.prev = 19;
                session.close;
                return _context.finish(19);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 15, 19, 22]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    return promise;
  },
  updateShowMeCriteria: function updateShowMeCriteria(parents, args, context) {
    var session = context.driver.session();
    var params = {
      id: args.input.id,
      input: args.input
    };
    return session.run('MERGE (n: ShowMeCriteria { id: $id }) ON MATCH SET n += $input RETURN n', params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("No records for showme");
      }

      return result.records[0].get(0).properties;
    })["catch"](function (e) {
      throw new Error("SHOWME ERROR: ".concat(e));
    });
    ;
  },
  deleteUser: function deleteUser(parent, args, context) {
    var session = context.driver.session();
    return session.run('MATCH (n { id: $id }) DETACH DELETE n', {
      id: args.id
    }).then(function (result) {
      session.close();
      return args.id;
    });
  },
  report: function report(parent, args, context) {
    var session = context.driver.session();
    var _args$input4 = args.input,
        from = _args$input4.from,
        to = _args$input4.to,
        message = _args$input4.message,
        reason = _args$input4.reason;
    var params = {
      from: from,
      to: to,
      message: message === undefined ? "" : message,
      reason: reason === undefined ? "" : reason
    };
    return session.run("MATCH (a: SocialNode),(b: SocialNode) \n                WHERE a.id = $from AND b.id = $to \n                CREATE (a)-[r:REPORTED { createdAt: timestamp(), reason: $reason, message: $message }]->(b) \n                RETURN a.id, b.id, $reason, $message", params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("User with id ".concat(args.from, " or user with id ").concat(args.to, " does not exist in databse"));
      }

      return {
        from: result.records[0].get('a.id'),
        to: result.records[0].get('b.id'),
        reason: result.records[0].get('$reason'),
        message: result.records[0].get('$message')
      };
    });
  },
  block: function block(parent, args, context) {
    var session = context.driver.session();
    var _args$input5 = args.input,
        from = _args$input5.from,
        to = _args$input5.to,
        message = _args$input5.message,
        reason = _args$input5.reason;
    var params = {
      from: from,
      to: to,
      message: message === undefined ? "" : message,
      reason: reason === undefined ? "" : reason
    };
    return session.run("MATCH (a: SocialNode),(b: SocialNode) \n                WHERE a.id = $from AND b.id = $to \n                CREATE (a)-[r:BLOCKED { createdAt: timestamp(), reason: $reason, message: $message }]->(b) \n                RETURN a.id, b.id, $reason, $message", params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("User with id ".concat(args.from, " or user with id ").concat(args.to, " does not exist in databse"));
      }

      return {
        from: result.records[0].get('a.id'),
        to: result.records[0].get('b.id'),
        reason: result.records[0].get('$reason'),
        message: result.records[0].get('$message')
      };
    });
  },
  becomeInvisibleTo: function becomeInvisibleTo(parent, args, context) {
    var session = context.driver.session();
    var _args$input6 = args.input,
        from = _args$input6.from,
        to = _args$input6.to;
    var params = {
      from: from,
      to: to
    };
    return session.run("MATCH (a: SocialNode),(b: SocialNode) \n                WHERE a.id = $from AND b.id = $to \n                CREATE (a)-[r:BECAME_INVISIBLE_TO { createdAt: timestamp() }]->(b) \n                RETURN a.id, b.id", params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("User with id ".concat(args.from, " or user with id ").concat(args.to, " does not exist in databse"));
      }

      return {
        from: result.records[0].get('a.id'),
        to: result.records[0].get('b.id')
      };
    });
  },
  becomeVisibleTo: function becomeVisibleTo(parent, args, context) {
    var session = context.driver.session();
    var _args$input7 = args.input,
        from = _args$input7.from,
        to = _args$input7.to;
    var params = {
      from: from,
      to: to
    };
    return session.run("MATCH (a: SocialNode {id: $from})-[r:BECAME_INVISIBLE_TO]->(b: SocialNode {id: $to}) \n                WITH r,a,b\n                DETACH DELETE r\n                RETURN a.id, b.id", params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("User with id ".concat(args.from, " or user with id ").concat(args.to, " does not exist in databse or they were invisible to begin with"));
      }

      return {
        from: result.records[0].get('a.id'),
        to: result.records[0].get('b.id')
      };
    });
  }
};
module.exports = mutations;