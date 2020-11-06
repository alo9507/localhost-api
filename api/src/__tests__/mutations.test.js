const seedDb = require("../scripts/seedDb");
describe.only("Integration Test mutations", () => {

    beforeAll(async () => {
        await seedDb();
    });

    test("test", () => {
        expect(true).toBe(true);
    });

});