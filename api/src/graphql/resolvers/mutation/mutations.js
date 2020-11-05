const { toNumber } = require("../../../utils");
const { generateQuery } = require("../../../utils");

const mutations = {
    message: (parent, args) => {
        return { message: args.message, success: true };
    },
    sendNod: (parent, args, context) => {
        const session = context.driver.session();
        const params = { from: args.from, to: args.to };
        return session
            .run(
                'MATCH (a:User),(b:User) WHERE a.id = $from AND b.id = $to CREATE (a)-[r:NODDED_AT]->(b) RETURN a.id, b.id',
                params
            )
            .then((result) => {
                session.close();
                return {
                    from: result.records[0].get('a.id'),
                    to: result.records[0].get('b.id'),
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
            .run('MATCH (n { id: $id }) SET n += $input RETURN n', params)
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
                const result2 = await txc.run('MERGE (showmecriteria: ShowMeCriteria { id: $id }) ON CREATE SET showmecriteria.sex = ["male", "female"] RETURN showmecriteria', params);
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
            .run('MERGE (n: ShowMeCriteria { id: $id }) ON CREATE SET n += $input ON MATCH SET n += $input RETURN n', params)
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
    }
};

module.exports = mutations;