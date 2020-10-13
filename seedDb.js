const neo4j = require('neo4j-driver')
const dotenv = require('dotenv')
dotenv.config()

console.log("Running seedDb...")
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

console.log(`Beginning seed transaction`)

session.writeTransaction(tx => {
        tx.run("CREATE (n:User { name: 'Andy', title: 'Developer' })");
        tx.run("CREATE (n:User { name: 'Susana', title: 'Me' })");
        tx.run("CREATE (n:User { name: 'Susana2', title: 'Me' })");
    })
    .then(result => {
        console.log(`Seed successful`)
        session.close()
    })
    .catch(e => {
        console.log(`Error seeding DB: ${e}`)
    })