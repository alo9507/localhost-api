const { createApolloFetch } = require('apollo-fetch');
const server = require('../apollo/server');
const clearDb = require("./clearDb");
const { CREATE_USER, UPDATE_USER, SEND_NOD } = require('../graphql/client/mutations');

async function createUsers(users) {
    const uri = 'http://localhost:4000/graphql';
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