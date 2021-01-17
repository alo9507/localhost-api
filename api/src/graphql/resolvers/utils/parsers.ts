export const preProcess = (input) => {
    input.workExperience = JSON.stringify(input.workExperience)
    input.education = JSON.stringify(input.education)
    return input
}

export const postProcess = (user) => {
    if (user?.workExperience) {
        user.workExperience = JSON.parse(user.workExperience)
    }
    if (user?.education) {
        user.education = JSON.parse(user.education)
    }
    return user
}