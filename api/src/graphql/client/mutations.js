const gql = require("graphql-tag");
const { print } = require('graphql');

module.exports.CREATE_USER = print(gql`
mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input ) {
        id
        sex
        name
        email
        bio
        whatAmIDoing
        isVisible
        age
    }
}`);

module.exports.UPDATE_USER = print(gql`
mutation UpdateUser($input: UpdateUserInput!){
    updateUser(input: $input ) {
        id
        sex
        name
        email
        bio
        whatAmIDoing
        isVisible
        age
    }
}`);