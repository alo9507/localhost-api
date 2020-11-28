import createFetch from '../apollo/fetch';
import { CREATE_USER } from '../graphql/client/mutations';

async function createUsers(users, port) {
  const uri = `http://localhost:${port}/graphql`;
  const apolloFetch = createFetch(uri, false);

  const promise = new Promise(async (resolve, reject) => {
    users.forEach(async (user) => {
      const variables = { input: user };
      await apolloFetch({ query: CREATE_USER, variables });
    });
    resolve(users);
  });

  return promise;
}

export default createUsers;
