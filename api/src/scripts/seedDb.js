const { createApolloFetch } = require('apollo-fetch');
const server = require('../apollo/server');
const { names, isVisible, bios, whatAmIDoings, sex, ages, emails } = require('./mocks/seedDbMocks');
const { rand } = require('../utils');

server.listen()
    .then(async ({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
        const uri = 'http://localhost:4000/graphql';
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

            console.log("Stopping server..");
            await server.stop();
            console.log("Server stopped. DB Seeded");
            process.exit(0);
        }
    });