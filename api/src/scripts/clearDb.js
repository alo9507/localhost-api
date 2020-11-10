import createDriver from '../neo4j/driver';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const clearDb = (databaseUri) => {
    const promise = new Promise((resolve, reject) => {
        const session = createDriver(databaseUri).session();

        session.writeTransaction(tx => {
            tx.run("MATCH (n) DETACH DELETE n");
        })
            .then(result => {
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

clearDb(process.env.NEO4J_URI);

export default clearDb;