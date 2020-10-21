const dotenv = require('dotenv')
const path = require('path');
dotenv.config({path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)})

module.exports = {
    neo4jUri: process.env.NEO4J_URI,
    neo4jUser: process.env.NEO4J_USER,
    neo4jPassword: process.env.NEO4J_PASSWORD,
    neo4jEncrypted: process.env.NEO4J_ENCRYPTED
}