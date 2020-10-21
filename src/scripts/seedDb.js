const neo4j = require('neo4j-driver')
const keys = require('./keys')

console.log("Running seedDb...")
console.log(`Configuring driver to ${keys.NEO4J_URI}...`)

const driver = neo4j.driver(
    keys.neo4jUri || 'bolt://localhost:7687',
    neo4j.auth.basic(
        keys.neo4jUser || 'neo4j',
        keys.neo4jPassword || 'neo4j'
    ),
    {
        encrypted: keys.neo4jEncrypted ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
    }
)

const session = driver.session()

console.log(`Beginning seed transaction`)

session.writeTransaction(tx => {
        tx.run("CREATE (n:User { name: 'Andy', title: 'Developer' })");
        tx.run("CREATE (n:User { name: 'Susana', title: 'Me' })");
        tx.run("CREATE (n:User { name: 'Susana2', title: 'Me' })");
    })
    .then(result => {
        console.log(`Seed successful`)
        session.close()
        process.exit(0);
    })
    .catch(e => {
        console.log(`Error seeding DB: ${e}`)
        process.exit(-1);
    })