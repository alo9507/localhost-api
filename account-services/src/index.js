import createServer from "./apollo/server";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const port = 4000;

createServer(process.env.NEO4J_URI).listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});