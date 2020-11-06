const seedDbInt = require("../scripts/seedDbInt");
const { createApolloFetch } = require('apollo-fetch');
const { CREATE_USER } = require('../graphql/client/mutations');
const { GET_USER } = require('../graphql/client/queries');
const clearDb = require('../scripts/clearDb');

describe("Integration Test mutations", () => {
    const uri = 'http://localhost:4000/graphql';
    const apolloFetch = createApolloFetch({ uri });

    beforeAll(async () => {
        await clearDb();
        return seedDbInt();
    });

    test('creates a user', async () => {
        const newUserId = "totallynewid";
        let query = CREATE_USER;

        const expectedResponse = {
            age: 43,
            bio: "Wannabe policeman",
            email: "me3@g.com",
            id: newUserId,
            isVisible: true,
            name: "Reginald",
            sex: "female",
            whatAmIDoing: "Doing this and that",
        };

        const variables = { input: expectedResponse };
        const result = await apolloFetch({ query, variables });
        expect(result.data.createUser).toEqual(expectedResponse);

        query = GET_USER;
        const getUserResult = await apolloFetch({ query, variables: { id: newUserId } });
        expect(result.data.createUser).toEqual(expectedResponse);
    });

});