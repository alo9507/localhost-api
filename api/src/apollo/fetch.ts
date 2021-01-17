import { createApolloFetch } from 'apollo-fetch';

function createFetch(uri, debug) {
  const apolloFetch = createApolloFetch({ uri });

  if (debug === true) {
    const afterware = ({ response }, next) => {
      if (response.status != 200) {
        console.log('ERROR RESPONE: ', response.raw);
      }
      next();
    };
    apolloFetch.useAfter(afterware);

    const middleware = ({ request }, next) => {
      console.log(request);
      next();
    };
    apolloFetch.use(middleware);
  }

  return apolloFetch;
}

export default createFetch;
