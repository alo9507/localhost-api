"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports.rand = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

module.exports.generateQuery = function (filter) {
  if (filter == undefined) return "MATCH (n: User) RETURN n";
  var query = "MATCH (n: User)";
  query = query.concat(" ", addFiltersToQuery(filter));
  query = query.concat(" ", "RETURN n");
  return query;
};

function addFiltersToQuery(filter) {
  var filters = Object.entries(filter);
  var conditionalString = "WHERE";
  var filtersLength = filters.length;
  filters.map(function (_ref, currentFilterEntry) {
    var _ref2 = _slicedToArray(_ref, 2),
        filterKey = _ref2[0],
        filterValue = _ref2[1];

    var filterOperator = Object.keys(filterValue)[0];
    var filterTarget = filterValue[filterOperator];

    switch (filterOperator) {
      case 'eq':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " = ").concat(wrapInString(filterTarget)));
        break;

      case 'ne':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " <> ").concat(wrapInString(filterTarget)));
        break;

      case 'le':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " <= ").concat(wrapInString(filterTarget)));
        break;

      case 'lt':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " < ").concat(wrapInString(filterTarget)));
        break;

      case 'ge':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " >= ").concat(wrapInString(filterTarget)));
        break;

      case 'gt':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " > ").concat(wrapInString(filterTarget)));
        break;

      case 'between':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " > ").concat(wrapInString(filterTarget[0]), " AND n.").concat(filterKey, " < ").concat(wrapInString(filterTarget[1])));
        break;

      case 'between_inclusive':
        conditionalString = conditionalString.concat(" ", "n.".concat(filterKey, " >= ").concat(wrapInString(filterTarget[0]), " AND n.").concat(filterKey, " <= ").concat(wrapInString(filterTarget[1])));
        break;

      default:
        throw Error("Operator ".concat(filterOperator, " not supported"));
    }

    if (currentFilterEntry < filtersLength - 1) {
      conditionalString = conditionalString.concat(" ", "AND");
    }
  });
  return conditionalString;
}

function wrapInString(filterTarget) {
  var pred = typeof filterTarget == 'string' ? "'".concat(filterTarget, "'") : "".concat(filterTarget);
  return pred;
}