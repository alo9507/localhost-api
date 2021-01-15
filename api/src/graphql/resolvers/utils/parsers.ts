export const preProcess = (input) => {
    input.workExperience = JSON.stringify(input.workExperience)
    return input
}

export const postProcess = (result) => {
    const user = result.records[0].get(0).properties
    if (user?.workExperience) {
        user.workExperience = JSON.parse(user.workExperience)
    }
    return user
}