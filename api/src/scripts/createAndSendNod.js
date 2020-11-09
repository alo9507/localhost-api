const { createApolloFetch } = require('apollo-fetch');
const clearDb = require("./clearDb");
const { CREATE_USER, SEND_NOD } = require('../graphql/client/mutations');

async function createAndSendNod(users, port) {
    const uri = `http://localhost:${port}/graphql`;
    const apolloFetch = createApolloFetch({ uri });

    let promise = new Promise(async (resolve, reject) => {
        for (name in users) {
            const variables = { input: users[name] };
            await apolloFetch({ query: CREATE_USER, variables });
        };
        if (users.length != 2) {
            throw new Error("Needs 2 users");
        }
        const input = { from: users[0], to: users[1], message: "nice ass", location: "mylocation" };
        const variables = { input };
        const sendNodResult = await apolloFetch({ query: SEND_NOD, variables });
        await apolloFetch({ query: SEND_NOD, variables });
        resolve();
    });

    return promise;
}

module.exports = createAndSendNod;