const { generateQuery } = require("../utils")

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
    }

    it("should return correct query for equality (string)", () => {
        const filter = { name: { eq: "Andrew"} }
        expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name = 'Andrew' RETURN n")
    })

    it("should return correct query for equality (number)", () => {
        const numberFilter = { age: { eq: 12} }
        expect(generateQuery(numberFilter)).toBe("MATCH (n: User) WHERE n.age = 12 RETURN n")
    })
})