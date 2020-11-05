module.exports.toNumber = ({ low, high }) => {
  let res = high;

  for (let i = 0; i < 32; i++) {
    res *= 2;
  }

  return low + res;
};

module.exports.generateQuery = (filter) => {
  if (filter == undefined) return "MATCH (n: User) RETURN n";

  let query = "MATCH (n: User)";
  query = query.concat("", addFiltersToQuery(filter));
  query = query.concat(" ", "RETURN n");
  return query;
};

// a recursive function to return only those OBJECTS with ATTR which pass the FILTER
function addFiltersToQuery(filter) {
  const filterEntries = Object.entries(filter);
  let whereStatements = "";
  filterEntries.map(([property, filter]) => {
    const filterType = typeof filter['eq'];
    const pred = filterType == 'string' ? `'${filter['eq']}'` : `${filter['eq']}`;
    whereStatements = whereStatements.concat(" ", `WHERE n.${property} = ${pred}`);
  });
  return whereStatements;
}