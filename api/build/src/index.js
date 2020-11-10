"use strict";

var _server = _interopRequireDefault(require("./apollo/server"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config({
  path: _path["default"].resolve(__dirname, "../../.env.".concat(process.env.NODE_ENV))
});

(0, _server["default"])(process.env.NEO4J_URI).listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});