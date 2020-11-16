import { createApolloFetch } from 'apollo-fetch';
import { UPDATE_SHOWME_CRITERIA } from '../graphql/client/mutations';
import { GET_VIABLE_USERS, SHOW_ME_CRITERIA } from '../graphql/client/queries';
import clearDb from '../scripts/clearDb';
import mockUsers from "../scripts/mocks/mockUsers";
import createUsers from "../scripts/createUsers";
import createAndSendNod from "../scripts/createAndSendNod";
import createServer from "../apollo/server";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

describe("Integration Test mutations", () => {
    const port = 4003;
    const uri = `http://localhost:${port}/graphql`;
    const apolloFetch = createApolloFetch({ uri });
    const server = createServer(process.env.NEO4J_URI2);

    beforeAll(async () => {
        console.log("beforeEach");
        await clearDb(process.env.NEO4J_URI2);
        await server.listen({ port });
    });

    afterAll(async () => {
        await server.stop();
    });

    afterEach(async () => {
        console.log("queries env", process.env.NEO4J_URI2);
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

        // john is young male seeking visible young male
        const updateShowMeCriteriaInput = { id: "john", sex: ["male"], age: [20, 30] };
        const variables = { input: updateShowMeCriteriaInput };
        const updateShowMeCriteriaResult = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables });
        expect(updateShowMeCriteriaResult.data.updateShowMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });

        // male_25_visible is male seeking visible young male
        const updateShowMeCriteriaInput_2 = { id: "male_25_visible", sex: ["male"], age: [20, 30] };
        const variables_2 = { input: updateShowMeCriteriaInput_2 };
        const updateShowMeCriteriaResult_2 = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables: variables_2 });
        expect(updateShowMeCriteriaResult_2.data.updateShowMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });

        const showMeCrit = await apolloFetch({ query: SHOW_ME_CRITERIA, variables: { id: "male_25_visible" } });
        expect(showMeCrit.data.showMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });

        const viableUsersResult = await apolloFetch({ query: GET_VIABLE_USERS, variables: { id: "john" } });
        expect(viableUsersResult.data.getViableUsers).toBe([mockUsers.male_25_visible]);
    });

}); 