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

module.exports.SEND_NOD = print(gql`
mutation SendNod($input: SendNodInput!){
    sendNod(input: $input ) {
        from
        to
        location
        message
    }
}`);

module.exports.RETURN_NOD = print(gql`
mutation ReturnNod($input: SendNodInput!){
    returnNod(input: $input ) {
        from
        to
        location
        message
    }
}`);

module.exports.DELETE_ALL_USERS = print(gql`
mutation DeleteAllUsers {
    deleteAllUsers {
        success
    }
}`);

module.exports.REPORT = print(gql`
mutation ReportUser($input: ReportInput!) {
    report(input: $input) {
        from
        to
        reason
        message
    }
}`);

module.exports.BLOCK = print(gql`
mutation BlockUser($input: BlockInput!) {
    block(input: $input) {
        from
        to
        reason
        message
    }
}`);

module.exports.UPDATE_SHOWME_CRITERIA = print(gql`
mutation UpdateShowMeCriteria($input: UpdateShowMeCriteriaInput!) {
    updateShowMeCriteria(input: $input) {
        sex
        age
    }
}`);