const { toNumber } = require("../../../utils");
const { generateQuery } = require("../../../utils");

const user = {
    outbound: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run(`
                MATCH (sender: SocialNode { id: "0" })-[r:NODDED_AT]->(recipient: SocialNode) 
                WITH recipient
                MATCH (other: User { id: recipient.id })
                RETURN other`, params)
            .then((result) => {
                session.close();
                return result.records.map((record) => record.get('other').properties);
            });
    },
    outboundCount: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n: SocialNode { id: $id })-[r:NODDED_AT]->(: SocialNode) RETURN COUNT(r) AS outboundCount', params)
            .then((result) => {
                session.close();
                return result.records[0].get('outboundCount');
            });
    },
    inbound: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run(`
            MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT]-(sender: SocialNode) 
            WITH sender
            MATCH (other: User { id: sender.id })
            RETURN other`, params)
            .then((result) => {
                session.close();
                return result.records.map((record) => record.get('other').properties);
            });
    },
    inboundCount: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: parent.id };
        return session
            .run('MATCH (n: SocialNode { id: $id })<-[r:NODDED_AT]-(: SocialNode) RETURN COUNT(r) AS inboundCount', params)
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