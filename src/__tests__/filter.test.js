const { objectAttributeFilter } = require("../utils")

it("should pass", () => {
    expect(objectAttributeFilter(1,2)).toBe(true)
}) 