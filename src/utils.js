module.exports.toNumber = ({ low, high }) => {
    let res = high
  
    for (let i = 0; i < 32; i++) {
      res *= 2
    }
  
    return low + res
  }

  // a recursive function to return only those OBJECTS with ATTR which abide by PREDICATE
module.exports.objectAttributeFilter = (obj, filter) => {
  for(attr in filter) {
    
    switch(pred) {
      case "ne":
        return obj[attr] != pred
      case "eq":
        return obj[attr] == pred
      case "le":
        return obj[attr] <= pred
      case "lt":
        return obj[attr] < pred
      case "ge":
        return obj[attr] >= pred
      case "gt":
        return obj[attr] > pred
      case contains:
        return obj[attr].contains(pred)
      case notContains:
        return !obj[attr].contains(pred)
    }
  }
}