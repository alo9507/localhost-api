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
    createUser: (parents, args, context) => {
        const session = context.driver.session();
        const params = { id: args.input.id, input: args.input };
        return session
            .run('MERGE (n:User { id: $id }) ON CREATE SET n.created = timestamp(), n += $input RETURN n', params)
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