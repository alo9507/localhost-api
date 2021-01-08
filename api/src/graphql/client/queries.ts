const gql = require('graphql-tag');
const { print } = require('graphql');

const GET_USER = print(gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      sex
      firstname
      lastname
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
  }
`);

const GET_USER_FULL = print(gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      sex
      firstname
      lastname
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
        age
      }
    }
  }
`);

const GET_VIABLE_USERS = print(gql`
  query GetViableUsers($id: ID!) {
    getViableUsers(id: $id) {
      id
    }
  }
`);

const SHOW_ME_CRITERIA = print(gql`
  query ShowMeCriteria($id: ID!) {
    showMeCriteria(id: $id) {
      sex
      age
    }
  }
`);

export { GET_USER, GET_USER_FULL, GET_VIABLE_USERS, SHOW_ME_CRITERIA };
