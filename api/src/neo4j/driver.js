const neo4j = require('neo4j-driver');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

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

module.exports = driver;