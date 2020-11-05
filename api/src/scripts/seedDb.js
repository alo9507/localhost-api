const { ApolloServer } = require('apollo-server');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers/resolvers');
const neo4j = require('neo4j-driver');
const { createApolloFetch } = require('apollo-fetch');
const { gql } = require('apollo-server');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });
const { print } = require('graphql');

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
        process.env.NEO4J_USER,
        process.env.NEO4J_PASSWORD
    ),
    {
        encrypted: 'ENCRYPTION_OFF',
        disableLosslessIntegers: true
    }
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { driver },
    introspection: true,
    playground: true
});

server.listen()
    .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
        const uri = 'http://localhost:4000/graphql';
        const apolloFetch = createApolloFetch({ uri });

        for (let i = 0; i < 10; i++) {
            const query = `
                mutation CreateUser($input: CreateUserInput!){
                    createUser(input: $input ) {
                        id
                        name
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

            fetch(uri, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables }),
            })
                .then(r => r.json())
                .then(data => console.log('data returned:', data));
        }
    });

const names = [
    "Andrew",
    "Jamie",
    "John",
    "Reginald",
    "Roger",
    "Jefferey"
];

const isVisible = [
    true,
    false
];

const bios = [
    "Student just chillin",
    "I am a narc",
    "Wannabe policeman",
    "Software engineer just hangin"
];

const whatAmIDoings = [
    "Reading War and Peace and waiting to be interrupted",
    "Doing this and that",
    "Drinking a coffee"
];

const sex = [
    "male",
    "female"
];

const ages = [
    24,
    20,
    32,
    43,
    18,
    14
];

const emails = [
    "me1@g.com",
    "me2@g.com",
    "me3@g.com"
];

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}