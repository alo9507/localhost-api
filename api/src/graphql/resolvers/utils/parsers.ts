export const preProcess = (input) => {
    input.workExperience = JSON.stringify(input.workExperience)
    return input
}

export const postProcess = (user) => {
    if (user?.workExperience) {
        user.workExperience = JSON.parse(user.workExperience)
    }
    return user
}