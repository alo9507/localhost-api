import { UPDATE_SHOWME_CRITERIA } from '../graphql/client/mutations';
import { GET_VIABLE_USERS, SHOW_ME_CRITERIA } from '../graphql/client/queries';
import clearDb from '../scripts/clearDb';
import mockUsers from "../scripts/mocks/mockUsers";
import createUsers from "../scripts/createUsers";
import createAndSendNod from "../scripts/createAndSendNod";
import createServer from "../apollo/server";
import createFetch from '../apollo/fetch';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

describe("Integration Test queries", () => {
    const port = 4003;
    const uri = `http://localhost:${port}/graphql`;
    const apolloFetch = createFetch(uri, false);

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

    test("should fetch only viable users according to user visibility and ShowMeCriteria of both parties", async () => {
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
        const updateShowMeCriteriaResult = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables: { input: updateShowMeCriteriaInput } });
        expect(updateShowMeCriteriaResult.data.updateShowMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });

        // male_25_visible is male seeking visible young male
        const updateShowMeCriteriaInput_2 = { id: "male_25_visible", sex: ["male"], age: [20, 30] };
        const updateShowMeCriteriaResult_2 = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables: { input: updateShowMeCriteriaInput_2 } });
        expect(updateShowMeCriteriaResult_2.data.updateShowMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });

        const viableUsersResult = await apolloFetch({ query: GET_VIABLE_USERS, variables: { id: "john" } });
        expect(viableUsersResult.data.getViableUsers).toEqual([{ id: "male_25_visible" }]);

        // john now wants to see young MALES AND FEMALES
        const updateShowMeCriteriaInput_3 = { id: "john", sex: ["male", "female"] };
        const updateShowMeCriteriaResult_3 = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables: { input: updateShowMeCriteriaInput_3 } });
        expect(updateShowMeCriteriaResult_3.data.updateShowMeCriteria).toEqual({ sex: ["male", "female"], age: [20, 30] });

        // and see them he shall
        const viableUsersResult2 = await apolloFetch({ query: GET_VIABLE_USERS, variables: { id: "john" } });
        expect(new Set(viableUsersResult2.data.getViableUsers)).toEqual(new Set([{ id: "male_25_visible" }, { id: "female_25_visible" }]));
    });

}); 