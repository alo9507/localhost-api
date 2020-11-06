const seedDb = require("../scripts/seedDb");
describe.only("Integration Test mutations", () => {

    beforeAll(async (done) => {
        await seedDb();
        done();
    });

    test("test", () => {
        expect(true).toBe(true);
    });

});