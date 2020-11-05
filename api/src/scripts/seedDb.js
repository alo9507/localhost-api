const neo4j = require('neo4j-driver')
const { join } = require('path')
const transcations = require('./transactions')

console.log("Running seedDb...")
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

console.log(`Beginning seed transaction`)

session.writeTransaction(tx => {
    transcations.forEach(transaction => {
        tx.run(transaction);
    })
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