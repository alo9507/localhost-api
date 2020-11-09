const { createApolloFetch } = require('apollo-fetch');
const { UPDATE_SHOWME_CRITERIA } = require('../graphql/client/mutations');
const { GET_VIABLE_USERS } = require('../graphql/client/queries');
const clearDb = require('../scripts/clearDb');
const mockUsers = require("../scripts/mocks/mockUsers");
const createUsers = require("../scripts/createUsers");
const createAndSendNod = require("../scripts/createAndSendNod");
const createServer = require("../apollo/server");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

describe("Integration Test mutations", () => {
    const port = 4002;
    const uri = `http://localhost:${port}/graphql`;
    const apolloFetch = createApolloFetch({ uri });
    const server = createServer(process.env.NEO4J_URI2);

    beforeAll(async () => {
        await clearDb(process.env.NEO4J_URI2);
        await server.listen({ port });
    });

    afterAll(async () => {
        await server.stop();
    });

    afterEach(async () => {
        await clearDb(process.env.NEO4J_URI2);
    });

    test("should fetch only viable users according to user visibility and showmecriteria", async () => {
        const users = await createUsers([
            mockUsers.john,
            mockUsers.male_25_visible,
            mockUsers.male_25_invisible,
            mockUsers.male_40_visible,
            mockUsers.female_25_visible,
            mockUsers.female_25_invisible,
            mockUsers.female_40_visible
        ], port);

        const updateShowMeCriteriaInput = { id: "john", sex: ["male"], age: [20, 30] };
        const variables = { input: updateShowMeCriteriaInput };
        const updateShowMeCriteriaResult = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables });
        expect(updateShowMeCriteriaResult.data.updateShowMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });

        const viableUsersResult = await apolloFetch({ query: GET_VIABLE_USERS, variables: { id: "john" } });
        expect(viableUsersResult.data.getViableUsers).toBe([mockUsers.male_25_visible]);
    });

}); 