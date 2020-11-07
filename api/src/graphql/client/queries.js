const gql = require("graphql-tag");
const { print } = require('graphql');

module.exports.GET_USER = print(gql`
query GetUser($id: ID!){
    user(id: $id) {
        id
        sex
        name
        email
        bio
        whatAmIDoing
        isVisible
        age
        inbound {
            id
        }
        outbound {
            id
        }
        mutual {
            id
        }
    }
}`);

module.exports.GET_USER_FULL = print(gql`
query GetUser($id: ID!){
    user(id: $id) {
        id
        sex
        name
        email
        bio
        whatAmIDoing
        isVisible
        age
        inbound {
            id
        }
        outbound {
            id
        }
        mutual {
            id
        }
        showMeCriteria {
            sex
        }
    }
}`);