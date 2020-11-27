import createFetch from '../apollo/fetch';
import createServer from '../apollo/server';
import { names, isVisible, bios, whatAmIDoings, sex, ages, emails } from './mocks/seedDbData';
import { rand } from '../utils';
import mockUsers from "./mocks/mockUsers";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const server = createServer(process.env.NEO4J_URI);
const port = 4005;

server.listen({ port })
    .then(async ({ url }) => {
        const uri = 'http://localhost:4005';
        const apolloFetch = createFetch(uri, false);

        const query = `
                mutation CreateUser($input: CreateUserInput!){
                    createUser(input: $input) {
                        name
                        id
                        email
                        age
                    }
            }`;

        for (var key in mockUsers) {
            const user = mockUsers[key];
            await apolloFetch({ query, variables: { input: user } });
        }

        await server.stop();
        console.log("DB Seeded");
        process.exit(0);
    });