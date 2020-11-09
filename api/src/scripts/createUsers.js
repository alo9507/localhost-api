const { createApolloFetch } = require('apollo-fetch');
const clearDb = require("./clearDb");
const { CREATE_USER, UPDATE_USER, SEND_NOD } = require('../graphql/client/mutations');

async function createUsers(users, port) {
    const uri = `http://localhost:${port}/graphql`;
    const apolloFetch = createApolloFetch({ uri });

    let promise = new Promise(async (resolve, reject) => {
        for (name in users) {
            const variables = { input: users[name] };
            await apolloFetch({ query: CREATE_USER, variables });
        };
        resolve(users);
    });

    return promise;
}

module.exports = createUsers;