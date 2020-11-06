const gql = require("graphql-tag");
const { print } = require('graphql');

module.exports.GET_USER = print(gql`
mutation GetUser($id: ID!){
    user(id: $id) {
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