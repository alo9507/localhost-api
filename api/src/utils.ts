const rand = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateQuery = (filter) => {
  if (filter == undefined) return 'MATCH (n: User) RETURN n';

  let query = 'MATCH (n: User)';
  query = query.concat(' ', addFiltersToQuery(filter));
  query = query.concat(' ', 'RETURN n');
  return query;
};

function addFiltersToQuery(filter) {
  const filters = Object.entries(filter);
  let conditionalString = 'WHERE';
  const filtersLength = filters.length;
  filters.map(([filterKey, filterValue], currentFilterEntry) => {
    const filterOperator = Object.keys(filterValue)[0];
    const filterTarget = filterValue[filterOperator];
    switch (filterOperator) {
      case 'eq':
        conditionalString = conditionalString.concat(' ', `n.${filterKey} = ${wrapInString(filterTarget)}`);
        break;
      case 'ne':
        conditionalString = conditionalString.concat(' ', `n.${filterKey} <> ${wrapInString(filterTarget)}`);
        break;
      case 'le':
        conditionalString = conditionalString.concat(' ', `n.${filterKey} <= ${wrapInString(filterTarget)}`);
        break;
      case 'lt':
        conditionalString = conditionalString.concat(' ', `n.${filterKey} < ${wrapInString(filterTarget)}`);
        break;
      case 'ge':
        conditionalString = conditionalString.concat(' ', `n.${filterKey} >= ${wrapInString(filterTarget)}`);
        break;
      case 'gt':
        conditionalString = conditionalString.concat(' ', `n.${filterKey} > ${wrapInString(filterTarget)}`);
        break;
      case 'between':
        conditionalString = conditionalString.concat(
          ' ',
          `n.${filterKey} > ${wrapInString(filterTarget[0])} AND n.${filterKey} < ${wrapInString(filterTarget[1])}`
        );
        break;
      case 'between_inclusive':
        conditionalString = conditionalString.concat(
          ' ',
          `n.${filterKey} >= ${wrapInString(filterTarget[0])} AND n.${filterKey} <= ${wrapInString(filterTarget[1])}`
        );
        break;
      default:
        throw Error(`Operator ${filterOperator} not supported`);
    }
    if (currentFilterEntry < filtersLength - 1) {
      conditionalString = conditionalString.concat(' ', 'AND');
    }
  });

  return conditionalString;
}

function wrapInString(filterTarget) {
  const pred = typeof filterTarget == 'string' ? `'${filterTarget}'` : `${filterTarget}`;
  return pred;
}

export {rand, generateQuery};
