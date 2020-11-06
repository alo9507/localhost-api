const driver = require('../neo4j/driver');

console.log("Running clearDB...");

const session = driver.session();

console.log(`Beginning delete transaction`);

session.writeTransaction(tx => {
    tx.run("MATCH (n) DETACH DELETE n");
})
    .then(result => {
        console.log(`Clear successful`);
        session.close();
        process.exit(0);
    })
    .catch(e => {
        console.log(`Error clearing DB: ${e}`);
        process.exit(-1);
    });