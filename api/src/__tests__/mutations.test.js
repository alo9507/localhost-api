const seedDbInt = require("../scripts/seedDbInt");
const { createApolloFetch } = require('apollo-fetch');
const { CREATE_USER } = require('../graphql/client/queries');

describe("Integration Test mutations", () => {
    const uri = 'http://localhost:4000/graphql';
    const apolloFetch = createApolloFetch({ uri });

    beforeAll(() => {
        return seedDbInt();
    });

    test('the data is peanut butter', async () => {
        const query = CREATE_USER;

        const variables = {
            input: {
                id: "1",
                sex: "male",
                name: "Andrew",
                email: "alo42@ge.com",
                bio: "sdfd",
                whatAmIDoing: "sdfd",
                isVisible: true,
                age: 12
            }
        };

        const result = await apolloFetch({ query, variables });

        const expectedResponse =
        {
            createUser: {
                "age": 43,
                "bio": "Wannabe policeman",
                "email": "me3@g.com",
                "id": "1",
                "isVisible": true,
                "name": "Reginald",
                "sex": "female",
                "whatAmIDoing": "Doing this and that",
            }
        };

        expect(result.data).toBe(expectedResponse);
    });

});