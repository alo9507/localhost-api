const seedDbInt = require("../scripts/seedDbInt");
const { createApolloFetch } = require('apollo-fetch');
const { CREATE_USER, UPDATE_USER } = require('../graphql/client/mutations');
const { GET_USER } = require('../graphql/client/queries');
const clearDb = require('../scripts/clearDb');
const mockUsers = require("../scripts/mocks/mockUsers");

describe("Integration Test mutations", () => {
    const uri = 'http://localhost:4000/graphql';
    const apolloFetch = createApolloFetch({ uri });

    beforeAll(async () => {
        await clearDb();
        return seedDbInt();
    });

    afterAll(async () => {
        return clearDb();
    });

    test('creates a user', async () => {
        const newUserId = "totallynewid";

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
        const result = await apolloFetch({ query: CREATE_USER, variables });
        expect(result.data.createUser).toEqual(expectedResponse);

        const getUserResult = await apolloFetch({ query: GET_USER, variables: { id: newUserId } });
        expect(result.data.createUser).toEqual(expectedResponse);
    });

    test('updates a user', async () => {
        const userId = "john";

        const getUserResult = await apolloFetch({ query: GET_USER, variables: { id: userId } });
        expect(getUserResult.data.user).toEqual(mockUsers.john);

        const variables = { input: { id: userId, name: "Not John Anymore" } };
        const updateUserResult = await apolloFetch({ query: UPDATE_USER, variables });
        expect(updateUserResult.data.updateUser).toEqual({ ...mockUsers.john, name: "Not John Anymore" });
    });

});