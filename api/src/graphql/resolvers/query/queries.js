import { toNumber } from "../../../utils";
import { generateQuery } from "../../../utils";

const queries = {
    user: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: args.id };
        return session
            .run('MATCH (n:User) WHERE n.id=$id RETURN n', params)
            .then((result) => {
                session.close();
                if (result.records == 0) {
                    throw new Error(`User with id ${args.id} does not exist in databse`);
                }
                return result.records[0].get(0).properties;
            });
    },
    users: (parent, args, context, info) => {
        const query = generateQuery(args.filter);
        const session = context.driver.session();
        return session.run(query).then((result) => {
            const users = result.records.map((record) => record.get(0).properties);
            session.close();
            return users;
        });
    },
    showMeCriteria: (parent, args, context, info) => {
        const session = context.driver.session();
        const params = { id: args.id };
        return session
            .run('MATCH (n: ShowMeCriteria { id: $id }) RETURN n', params)
            .then((result) => {
                session.close();
                if (result.records == 0) {
                    throw new Error(`ShowMeCriteria with id ${args.id} does not exist in databse`);
                }
                return result.records[0].get(0).properties;
            });
    },
    getDistanceBetween: (parent, args, context) => {
        const session = context.driver.session();
        const params = { user1ID: args.user1, user2ID: args.user2 };
        return session
            .run('MATCH (user1:User), (user2:User) WHERE user1.id = $user1ID AND user2.id = $user2ID WITH point({ longitude: user1.longitude, latitude: user1.latitude }) AS user1Point, point({ longitude: user2.longitude, latitude: user2.latitude }) AS user2point RETURN round(distance(user1Point, user2point)) AS distanceBetweenUsers', params)
            .then(result => {
                session.close();
                return result.records[0].get('distanceBetweenUsers');
            });
    },
    getViableUsers: (parent, args, context) => {
        const session = context.driver.session();
        const params = { id: args.id };
        return session
            .run(`
            MATCH (requestor_criteria: ShowMeCriteria { id: $id }), (requestor: User { id: $id })
            WITH requestor, requestor_criteria
            MATCH (other: User), (other_criteria: ShowMeCriteria { id: other.id })
            WHERE other.isVisible = true
            AND other.sex IN requestor_criteria.sex
            AND requestor.sex IN other_criteria.sex
            AND requestor.age IN range(other_criteria.age[0], other_criteria.age[1])
            AND other.age IN range(requestor_criteria.age[0], requestor_criteria.age[1])
            AND other.id <> requestor.id
            RETURN other`
                , params)
            .then((result) => {
                const users = result.records.map((record) => record.get(0).properties);
                session.close();
                return users;
            });
    }
};

export default queries;