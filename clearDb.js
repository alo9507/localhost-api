const neo4j = require('neo4j-driver')
const keys = require('./keys')

console.log("Running clearDb...")
console.log(`Configuring driver to ${keys.NEO4J_URI}...`)

const driver = neo4j.driver(
    keys.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
        keys.neo4jUser || 'neo4j',
        keys.neo4jPassword || 'neo4j'
    ),
    {
        encrypted: keys.neo4jEncrypted ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
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