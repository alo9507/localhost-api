const { toNumber } = require("../../../utils");
const { generateQuery } = require("../../../utils");

const mutations = {
    sendNod: (parent, args, context) => {
        const session = context.driver.session();
        const { from, to, message, location } = args.input;
        const params = { from, to, message: message === undefined ? "" : message, location: location === undefined ? "" : location };
        return session
            .run(
                `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:NODDED_AT { initiator: true, seen: false, createdAt: timestamp(), message: $message, location: $location }]->(b) 
                RETURN a.id, b.id, $message, $location`,
                params
            )
            .then((result) => {
                session.close();
                return {
                    from: result.records[0].get('a.id'),
                    to: result.records[0].get('b.id'),
                    message: result.records[0].get('$message'),
                    location: result.records[0].get('$location')
                };
            });
    },
    returnNod: (parent, args, context) => {
        const session = context.driver.session();
        const { from, to, message, location } = args.input;
        const params = { from, to, message: message === undefined ? "" : message, location: location === undefined ? "" : location };
        return session
            .run(
                `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:NODDED_AT { initiator: false, seen: false, createdAt: timestamp(), message: $message, location: $location }]->(b) 
                RETURN a.id, b.id, $message, $location`,
                params
            )
            .then((result) => {
                session.close();
                return {
                    from: result.records[0].get('a.id'),
                    to: result.records[0].get('b.id'),
                    message: result.records[0].get('$message'),
                    location: result.records[0].get('$location')
                };
            });
    },
    nodSeen: (parent, args, context) => {
        const session = context.driver.session();
        const params = { recipient: args.recipient, sender: args.sender };
        return session
            .run(
                'MATCH (a: SocialNode { id: $sender } )-[r:NODDED_AT]->(b: SocialNode { id: $recipient } ) SET r.seen = true RETURN $recipient, $sender',
                params
            )
            .then((result) => {
                session.close();
                return {
                    sender: result.records[0].get('$sender'),
                    recipient: result.records[0].get('$recipient'),
                };
            });
    },
    deleteAllUsers: (parent, args, context) => {
        const session = context.driver.session();
        return session
            .run('MATCH (n) DETACH DELETE n')
            .then(result => {
                session.close();
                return "Succesfully deleted all users";
            });
    },
    updateUser: (parent, args, context) => {
        const session = context.driver.session();
        const params = { id: args.input.id, input: args.input };
        return session
            .run('MATCH (n: User { id: $id }) SET n += $input RETURN n', params)
            .then(result => {
                session.close();
                return result.records[0].get(0).properties;
            });
    },
    // session.run('MERGE (n: ShowMeCriteria { id: $id }) ON CREATE SET n += $input ON CREATE SET n.sex = ["male", "female"] RETURN n', params)
    createUser: (parents, args, context) => {
        const session = context.driver.session();
        const params = { id: args.input.id, input: args.input };
        const txc = session.beginTransaction();
        const promise = new Promise(async (resolve, reject) => {
            try {
                const userResult = await txc.run('MERGE (n:User { id: $id }) ON CREATE SET n.created = timestamp(), n += $input RETURN n', params);
                const user = userResult.records[0].get(0).properties;
                const showMeCriteriaResult = await txc.run(`
                MERGE (showmecriteria: ShowMeCriteria { id: $id }) 
                ON CREATE SET showmecriteria.sex = ["male", "female"], showmecriteria.age = [18, 100]
                RETURN showmecriteria`, params);
                const socialNodeResult = await txc.run('MERGE (socialNode: SocialNode { id: $id }) RETURN socialNode', params);
                txc.commit();
                resolve(user);
            } catch (e) {
                reject(e);
                txc.rollback();
            } finally {
                session.close;
            }
        });
        return promise;
    },
    updateShowMeCriteria: (parents, args, context) => {
        const session = context.driver.session();
        const params = { id: args.input.id, input: args.input };
        return session
            .run('MERGE (n: ShowMeCriteria { id: $id }) ON MATCH SET n += $input RETURN n', params)
            .then(result => {
                session.close();
                return result.records[0].get(0).properties;
            });
    },
    deleteUser: (parent, args, context) => {
        const session = context.driver.session();
        return session
            .run('MATCH (n { id: $id }) DETACH DELETE n', { id: args.id })
            .then(result => {
                session.close();
                return args.id;
            });
    },
    report: (parent, args, context) => {
        const session = context.driver.session();
        const { from, to, message, reason } = args.input;
        const params = { from, to, message: message === undefined ? "" : message, reason: reason === undefined ? "" : reason };
        return session
            .run(
                `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:REPORTED { createdAt: timestamp(), reason: $reason, message: $message }]->(b) 
                RETURN a.id, b.id, $reason, $message`, params)
            .then((result) => {
                session.close();
                if (result.records == 0) {
                    throw new Error(`User with id ${args.from} or user with id ${args.to} does not exist in databse`);
                }
                return {
                    from: result.records[0].get('a.id'),
                    to: result.records[0].get('b.id'),
                    reason: result.records[0].get('$reason'),
                    message: result.records[0].get('$message')
                };
            });
    }
};

module.exports = mutations;