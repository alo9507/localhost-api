const { createApolloFetch } = require('apollo-fetch');
const server = require('../apollo/server');
const { names, isVisible, bios, whatAmIDoings, sex, ages, emails } = require('./mocks/mockUsers');
const { rand } = require('../utils');
const users = require("./mocks/mockUsers");
const { CREATE_USER } = require("../graphql/client/mutations");

const seedDbInt = () => {
    const promise = new Promise(async (resolve, reject) => {
        const { url } = await server.listen();

        console.log(`🚀  Server ready at ${url}`);
        const uri = 'http://localhost:4000/graphql';
        const apolloFetch = createApolloFetch({ uri });

        for (name in users) {
            const variables = { input: users[name] };
            await apolloFetch({ query: CREATE_USER, variables });
        };
        resolve();
    });
    return promise;
};

module.exports = seedDbInt;