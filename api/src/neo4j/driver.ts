import neo4j from 'neo4j-driver';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

function createDriver(neo4jURI) {
  const driver = neo4j.driver(neo4jURI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD), {
    encrypted: 'ENCRYPTION_OFF',
    disableLosslessIntegers: true
  });

  return driver;
}

export default createDriver;
