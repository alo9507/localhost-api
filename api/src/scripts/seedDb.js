import { createApolloFetch } from 'apollo-fetch';
import createServer from '../apollo/server';
import { names, isVisible, bios, whatAmIDoings, sex, ages, emails } from './mocks/seedDbData';
import { rand } from '../utils';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const server = createServer(process.env.NEO4J_URI);

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