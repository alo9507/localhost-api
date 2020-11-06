const driver = require('../neo4j/driver');

const clearDb = () => {
    const promise = new Promise((resolve, reject) => {
        console.log("Running clearDB...");
        const session = driver.session();

        session.writeTransaction(tx => {
            tx.run("MATCH (n) DETACH DELETE n");
        })
            .then(result => {
                console.log(`Clear successful`);
                session.close();
                resolve();
                if (process.env.CMD_LINE) { process.exit(0); }
            })
            .catch(e => {
                console.log(`Error clearing DB: ${e}`);
                reject();
                if (process.env.CMD_LINE) { process.exit(-1); }
            });
    });
    return promise;
};

clearDb();

module.exports = clearDb;