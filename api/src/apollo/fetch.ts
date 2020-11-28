import {createApolloFetch} from 'apollo-fetch';

function createFetch(uri, debug) {
  const apolloFetch = createApolloFetch({uri});

  if (debug === true) {
    const afterware = ({response, options}, next) => {
      if (response.status != 200) {
        console.log(response.raw);
      }
      next();
    };
    apolloFetch.useAfter(afterware);

    const middleware = ({request, options}, next) => {
      console.log(request);
      next();
    };
    apolloFetch.use(middleware);
  }

  return apolloFetch;
}

export default createFetch;
