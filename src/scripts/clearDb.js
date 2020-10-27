const neo4j = require('neo4j-driver')
const keys = require('../keys')

console.log("Running clearDB...")
console.log(`Configuring driver to ${process.env.NEO4J_URI}...`)

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
        process.env.NEO4J_USER,
        process.env.NEO4J_PASSWORD
    ),
    {
        encrypted: "ENCRYPTION_OFF"
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