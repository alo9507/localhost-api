const { generateQuery } = require("../utils");

describe("Filter", () => {

    const user = {
        id: "abcd",
        name: "Andrew",
        bio: "Here's my bio",
        whatAmIDoing: "Here's what I'm doing",
        isVisible: true,
        sex: "male",
        age: 23,
        latitude: 12.1,
        longitude: 12.1,
        email: "sdf@g.com"
    };

    // eq
    it("should return correct query for equality (string)", () => {
        const filter = { name: { eq: "Andrew" } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name = 'Andrew' RETURN n");
    });

    it("should return correct query for equality (number)", () => {
        const filter = { age: { eq: 12 } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.age = 12 RETURN n");
    });

    it("should return correct query for equality mixed number and string in same query", () => {
        const filter = { name: { eq: "Andrew" }, age: { eq: 12 } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name = 'Andrew' WHERE n.age = 12 RETURN n");
    });

    // ne
    it("should return correct query for inequality (string)", () => {
        const filter = { name: { ne: "Andrew" } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name <> 'Andrew' RETURN n");
    });

    it("should return correct query for inequality (number)", () => {
        const filter = { age: { ne: 12 } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.age <> 12 RETURN n");
    });

    it("should return correct query for equality mixed number and string in same query", () => {
        const filter = { name: { ne: "Andrew" }, age: { ne: 12 } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name <> 'Andrew' WHERE n.age <> 12 RETURN n");
    });

    it("should return correct query for equality and inequality same query", () => {
        const filter = { name: { ne: "Andrew" }, age: { eq: 12 } };
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name <> 'Andrew' WHERE n.age = 12 RETURN n");
    });
});