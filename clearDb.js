const neo4j = require('neo4j-driver')
const dotenv = require('dotenv')
dotenv.config()

console.log("Running clearDb...")
console.log(`Configuring driver to ${process.env.NEO4J_URI}...`)

const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD || 'neo4j'
    ),
    {
        encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
    }
)

const session = driver.session()

console.log(`Beginning delete transaction`)

session.writeTransaction(tx => {
        tx.run("MATCH (n) DETACH DELETE n");
    })
    .then(result => {
        console.log(`Clear successful`)
        session.close()
        process.exit(0);
    })
    .catch(e => {
        console.log(`Error clearing DB: ${e}`)
        process.exit(-1);
    })