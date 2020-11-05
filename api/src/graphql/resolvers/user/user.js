const { toNumber } = require("../../../utils");
const { generateQuery } = require("../../../utils");

const user = {
    outbound: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n { id: $id })-[r:NODDED_AT]->(other:User) RETURN other', params)
            .then((result) => {
                session.close();
                return result.records.map((record) => record.get('other').properties);
            });
    },
    outboundCount: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n { id: $id })-[r:NODDED_AT]->(:User) RETURN COUNT(r) AS outboundCount', params)
            .then((result) => {
                session.close();
                return result.records[0].get('outboundCount');
            });
    },
    inbound: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n { id: $id })<-[r:NODDED_AT]-(other:User) RETURN other', params)
            .then((result) => {
                session.close();
                return result.records.map((record) => record.get('other').properties);
            });
    },
    inboundCount: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n { id: $id })<-[r:NODDED_AT]-(:User) RETURN COUNT(r) AS inboundCount', params)
            .then((result) => {
                session.close();
                return result.records[0].get('inboundCount');
            });
    },
    showMeCriteria: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n: ShowMeCriteria { id: $id }) RETURN n', params)
            .then((result) => {
                if (result.records == 0) {
                    return [];
                }
                session.close();
                return result.records[0].get('n').properties;
            });
    },
};

module.exports = user;