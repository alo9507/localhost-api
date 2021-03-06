import { createApolloFetch } from 'apollo-fetch';
import { CREATE_USER, SEND_NOD } from '../graphql/client/mutations';

async function createAndSendNod(users, port) {
  const uri = `http://localhost:${port}/graphql`;
  const apolloFetch = createApolloFetch({ uri });

  const promise = new Promise<void>(async (resolve, _) => {
    for (const user of users) {
      const variables = { input: user };
      await apolloFetch({ query: CREATE_USER, variables });
    }

    if (users.length != 2) {
      throw new Error('Needs 2 users');
    }
    const input = { from: users[0], to: users[1], message: 'nice ass', location: 'mylocation' };
    const variables = { input };
    const __ = await apolloFetch({ query: SEND_NOD, variables });
    await apolloFetch({ query: SEND_NOD, variables });
    resolve();
  });

  return promise;
}

export default createAndSendNod;
