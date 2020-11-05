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

function addFiltersToQuery(filter) {
  const filters = Object.entries(filter);
  let whereStatementStrings = "";
  filters.map(([filterKey, filterValue]) => {
    const filterOperator = Object.keys(filterValue)[0];
    switch (filterOperator) {
      case 'eq':
        const filterTarget = filterValue['eq'];
        whereStatementStrings = whereStatementStrings.concat(" ", `WHERE n.${filterKey} = ${wrapInString(filterTarget)}`);
        break;
      default:
        throw Error(`Operator ${filterOperator} not supported`);
    }
  });

  return whereStatementStrings;
}

function wrapInString(filterTarget) {
  const pred = typeof filterTarget == 'string' ? `'${filterTarget}'` : `${filterTarget}`;
  return pred;
}

// { name: { eq: "Andrew" }, sex: { eq: "male" } }
