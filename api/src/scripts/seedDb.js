const { createApolloFetch } = require('apollo-fetch');
const createServer = require('../apollo/server');
const { names, isVisible, bios, whatAmIDoings, sex, ages, emails } = require('./mocks/seedDbData');
const { rand } = require('../utils');

const server = createServer();

server.listen({ port: 4001 })
    .then(async ({ url }) => {
        const uri = 'http://localhost:4001/graphql';
        const apolloFetch = createApolloFetch({ uri });

        for (let i = 0; i < 10; i++) {
            const query = `
                mutation CreateUser($input: CreateUserInput!){
                    createUser(input: $input ) {
                        name
                        id
                        email
                        age
                    }
            }`;

            const variables = {
                input: {
                    id: i,
                    sex: rand(sex),
                    name: rand(names),
                    email: rand(emails),
                    bio: rand(bios),
                    whatAmIDoing: rand(whatAmIDoings),
                    isVisible: rand(isVisible),
                    age: rand(ages)
                }
            };

            await apolloFetch({ query, variables });
        }
        await server.stop();
        console.log("DB Seeded");
        process.exit(0);
    });