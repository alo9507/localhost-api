import createFetch from '../apollo/fetch';
import { UPDATE_LOCATION_AND_GET_USERS, BECOME_VISIBLE_TO, BECOME_INVISIBLE_TO, BLOCK, CREATE_USER, UPDATE_USER, SEND_NOD, DELETE_ALL_USERS, RETURN_NOD, REPORT, UPDATE_SHOWME_CRITERIA, UPDATE_USER_LOCATION } from '../graphql/client/mutations';
import { GET_USER, GET_USER_FULL } from '../graphql/client/queries';
import clearDb from '../scripts/clearDb';
import mockUsers from "../scripts/mocks/mockUsers";
import createUsers from "../scripts/createUsers";
import createAndSendNod from "../scripts/createAndSendNod";
import createServer from "../apollo/server";
import path from 'path';
import dotenv from 'dotenv';
import { generateRandomPoint } from '../geo';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

describe("Integration Test mutations", () => {
    const port = 4002;
    const uri = `http://localhost:${port}/graphql`;
    const apolloFetch = createFetch(uri, false);
    const server = createServer(process.env.NEO4J_URI1);

    beforeAll(async () => {
        await clearDb(process.env.NEO4J_URI1);
        await server.listen({ port });
    });

    afterAll(async () => {
        await server.stop();
    });

    afterEach(async () => {
        await clearDb(process.env.NEO4J_URI1);
    });

    test('creates a user', async () => {
        const newUserId = "totallynewid";

        const input = {
            age: 43,
            bio: "Wannabe policeman",
            email: "me3@g.com",
            id: newUserId,
            isVisible: true,
            name: "Reginald",
            sex: "female",
            whatAmIDoing: "Doing this and that",
        };

        const expectedResponse = {
            ...input,
            inbound: [],
            outbound: [],
            mutual: [],
        };

        const variables = { input };
        const result = await apolloFetch({ query: CREATE_USER, variables });
        expect(result.data.createUser).toEqual(expectedResponse);

        const getUserResult = await apolloFetch({ query: GET_USER, variables: { id: newUserId } });
        expect(result.data.createUser).toEqual(expectedResponse);
    });

    test('updates a user', async () => {
        await createUsers([mockUsers.john], port);
        const userId = "john";

        const getUserResult = await apolloFetch({ query: GET_USER, variables: { id: userId } });
        expect(getUserResult.data.user).toEqual({ ...mockUsers.john, inbound: [], outbound: [], mutual: [] });

        const variables = { input: { id: userId, name: "Not John Anymore" } };
        const updateUserResult = await apolloFetch({ query: UPDATE_USER, variables });
        expect(updateUserResult.data.updateUser).toEqual({ ...mockUsers.john, inbound: [], outbound: [], mutual: [], name: "Not John Anymore" });
    });

    test('sends a nod from one user to another', async () => {
        await createUsers([mockUsers.john, mockUsers.jenny], port);

        const senderId = "john";
        const recipientId = "jenny";

        const input = { from: senderId, to: recipientId, message: "nice ass", location: "mylocation" };
        const variables = { input };
        const sendNodResult = await apolloFetch({ query: SEND_NOD, variables });
        expect(sendNodResult.data.sendNod).toEqual(input);

        const expectedSenderResponse = {
            ...mockUsers.john,
            inbound: [],
            outbound: [
                {
                    id: "jenny"
                }
            ],
            mutual: []
        };

        const senderUserResponse = await apolloFetch({ query: GET_USER, variables: { id: senderId } });
        expect(senderUserResponse.data.user).toEqual(expectedSenderResponse);

        const expectedRecipientResponse = {
            ...mockUsers.jenny,
            inbound: [
                {
                    id: "john"
                }],
            outbound: [],
            mutual: []
        };

        const recipientUserResponse = await apolloFetch({ query: GET_USER, variables: { id: recipientId } });
        expect(recipientUserResponse.data.user).toEqual(expectedRecipientResponse);
    });

    test('return a nod from one user to another', async () => {
        await createUsers([mockUsers.john, mockUsers.jenny], port);

        // SEND A NOD
        const senderId = "john";
        const recipientId = "jenny";

        const input = { from: senderId, to: recipientId, message: "nice ass", location: "mylocation" };
        const variables = { input };
        const sendNodResult = await apolloFetch({ query: SEND_NOD, variables });
        expect(sendNodResult.data.sendNod).toEqual(input);

        const expectedSenderResponse = {
            ...mockUsers.john,
            inbound: [],
            outbound: [
                {
                    id: "jenny"
                }
            ],
            mutual: []
        };

        const senderUserResponse = await apolloFetch({ query: GET_USER, variables: { id: senderId } });
        expect(senderUserResponse.data.user).toEqual(expectedSenderResponse);

        const expectedRecipientResponse = {
            ...mockUsers.jenny,
            inbound: [
                {
                    id: "john"
                }],
            outbound: [],
            mutual: []
        };

        const recipientUserResponse = await apolloFetch({ query: GET_USER, variables: { id: recipientId } });
        expect(recipientUserResponse.data.user).toEqual(expectedRecipientResponse);

        // RETURN A NOD
        const returnNodInput = { from: recipientId, to: senderId, message: "thx", location: "mylocation" };
        const returnNodResponse = await apolloFetch({ query: RETURN_NOD, variables: { input: returnNodInput } });
        expect(returnNodResponse.data.returnNod).toEqual(returnNodInput);

        const expectedReturnerResponse = {
            ...mockUsers.jenny,
            inbound: [],
            outbound: [],
            mutual: [
                {
                    id: "john"
                }
            ]
        };

        const returnerUserResponse = await apolloFetch({ query: GET_USER, variables: { id: recipientId } });
        expect(returnerUserResponse.data.user).toEqual(expectedReturnerResponse);

        const expectedInitialSenderResponse = {
            ...mockUsers.john,
            inbound: [],
            outbound: [],
            mutual: [
                {
                    id: "jenny"
                }
            ]
        };

        const initialSenderUserResponse = await apolloFetch({ query: GET_USER, variables: { id: senderId } });
        expect(initialSenderUserResponse.data.user).toEqual(expectedInitialSenderResponse);
    });

    test("should fetch unseen inbound nods", async () => {
        await createAndSendNod([mockUsers.john, mockUsers.jenny], port);
    });

    test("should report user", async () => {
        await createUsers([mockUsers.john, mockUsers.jenny], port);

        const reportInput = { from: "john", to: "jenny", reason: "he bit me", message: "really bad" };
        const variables = { input: reportInput };
        const reportResult = await apolloFetch({ query: REPORT, variables });
        expect(reportResult.data.report).toEqual(reportInput);
    });

    test("should report user", async () => {
        await createUsers([mockUsers.john, mockUsers.jenny], port);

        const blockInput = { from: "john", to: "jenny", reason: "he bit me", message: "really bad" };
        const variables = { input: blockInput };
        const blockResult = await apolloFetch({ query: BLOCK, variables });
        expect(blockResult.data.block).toEqual(blockInput);
    });

    test("should allow becoming invisible to some users", async () => {
        await createUsers([mockUsers.john, mockUsers.jenny], port);

        const becomeInvisibleToInput = { from: "john", to: "jenny" };
        const variables = { input: becomeInvisibleToInput };
        const becomeInvisibleToResult = await apolloFetch({ query: BECOME_INVISIBLE_TO, variables });
        expect(becomeInvisibleToResult.data.becomeInvisibleTo).toEqual(becomeInvisibleToInput);
    });

    test("should allow becoming visible to some users", async () => {
        await createUsers([mockUsers.john, mockUsers.jenny], port);

        const becomeInvisibleToInput = { from: "john", to: "jenny" };
        const becomeInvisibleToInput_variables = { input: becomeInvisibleToInput };
        const becomeInvisibleToResult = await apolloFetch({ query: BECOME_INVISIBLE_TO, variables: becomeInvisibleToInput_variables });
        expect(becomeInvisibleToResult.data.becomeInvisibleTo).toEqual(becomeInvisibleToInput);

        const becomeVisibleToInput = { from: "john", to: "jenny" };
        const variables = { input: becomeVisibleToInput };
        const becomeVisibleToResult = await apolloFetch({ query: BECOME_VISIBLE_TO, variables });
        expect(becomeVisibleToResult.data.becomeVisibleTo).toEqual(becomeVisibleToInput);
    });

    test("should update showme criteria", async () => {
        const users = await createUsers([mockUsers.john], port);

        const getUserResult = await apolloFetch({ query: GET_USER_FULL, variables: { id: users[0].id } });
        expect(getUserResult.data.user.showMeCriteria).toEqual({ sex: ["male", "female"], age: [18, 100] });

        const updateShowMeCriteriaInput = { id: users[0].id, sex: ["male"], age: [20, 30] };
        const variables = { input: updateShowMeCriteriaInput };
        const updateShowMeCriteriaResult = await apolloFetch({ query: UPDATE_SHOWME_CRITERIA, variables });
        expect(updateShowMeCriteriaResult.data.updateShowMeCriteria).toEqual({ sex: ["male"], age: [20, 30] });
    });

    test("should update location", async () => {
        const users = await createUsers([mockUsers.john], port);

        const updateUserLocationInput = { id: users[0].id, latitude: 12.5435, longitude: 10.432 };
        const variables = { input: updateUserLocationInput };
        const updateLocationResult = await apolloFetch({ query: UPDATE_USER_LOCATION, variables });
        expect(updateLocationResult.data.updateLocation).toEqual({ id: "john", latitude: 12.5435, longitude: 10.432 });
    });

    test("should fetch only viable users according to user visibility, ShowMeCriteria of both parties, and location", async () => {
        const users = await createUsers([
            mockUsers.john,
            mockUsers.nearby,
            mockUsers.lat80_long80
        ], port);

        const johnLocation = { latitude: 24.22244098031902, longitude: 23.125367053780863 };

        const nearbyPoint = generateRandomPoint(johnLocation, 999);

        const nearbyVariables = { input: { id: "nearby", latitude: nearbyPoint.latitude, longitude: nearbyPoint.longitude } };
        const stuff = await apolloFetch({ query: UPDATE_LOCATION_AND_GET_USERS, variables: nearbyVariables });

        const variables = { input: { id: "john", latitude: johnLocation.latitude, longitude: johnLocation.longitude } };
        const usersNearJohn = await apolloFetch({ query: UPDATE_LOCATION_AND_GET_USERS, variables });

        expect(new Set(usersNearJohn.data.updateLocationGetUsers)).toEqual(new Set([{ id: "nearby" }]));
    });

});