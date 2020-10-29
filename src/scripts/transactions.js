const names = [
    "Andrew",
    "Jamie",
    "John",
    "Reginald",
    "Roger",
    "Jefferey"
]

const bios = [
    "Student just chillin",
    "I am a narc",
    "Wannabe policeman",
    "Software engineer just hangin"
]

const whatAmIDoings = [
    "Reading War and Peace and waiting to be interrupted",
    "Doing this and that",
    "Drinking a coffee"
]

const sex = [
    "male",
    "female"
]

const ages = [
    24,
    20,
    32,
    43,
    18,
    14
]

const emails = [
    "me1@g.com",
    "me2@g.com",
    "me3@g.com"
]

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

let transactions = []
for (let i = 1; i < 10; i++) {
    const tx = `
    CREATE (n:User { 
        id: '${i}', 
        name: '${rand(names)}', 
        email: '${rand(emails)}', 
        bio: '${rand(bios)}', 
        whatAmIDoing: '${rand(whatAmIDoings)}', 
        age: '${rand(ages)}' })`

    transactions.push(tx)
}   

module.exports = transactions