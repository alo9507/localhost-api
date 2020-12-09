import gql from 'graphql-tag';
import { print } from 'graphql';

const CREATE_USER = print(gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
  }
`);

const UPDATE_USER = print(gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
  }
`);

const SEND_NOD = print(gql`
  mutation SendNod($input: SendNodInput!) {
    sendNod(input: $input) {
      from
      to
      latitude
      longitude
      message
    }
  }
`);

const RETURN_NOD = print(gql`
  mutation ReturnNod($input: SendNodInput!) {
    returnNod(input: $input) {
      from
      to
      latitude
      longitude
      message
    }
  }
`);

const DELETE_ALL_USERS = print(gql`
  mutation DeleteAllUsers {
    deleteAllUsers {
      success
    }
  }
`);

const REPORT = print(gql`
  mutation ReportUser($input: ReportInput!) {
    report(input: $input) {
      from
      to
      reason
      message
    }
  }
`);

const BLOCK = print(gql`
  mutation BlockUser($input: BlockInput!) {
    block(input: $input) {
      from
      to
      reason
      message
    }
  }
`);

const BECOME_INVISIBLE_TO = print(gql`
  mutation BecomeInvisibleTo($input: BecomeInvisibleToInput!) {
    becomeInvisibleTo(input: $input) {
      from
      to
    }
  }
`);

const BECOME_VISIBLE_TO = print(gql`
  mutation BecomeInvisibleTo($input: BecomeVisibleToInput!) {
    becomeVisibleTo(input: $input) {
      from
      to
    }
  }
`);

const UPDATE_SHOWME_CRITERIA = print(gql`
  mutation UpdateShowMeCriteria($input: UpdateShowMeCriteriaInput!) {
    updateShowMeCriteria(input: $input) {
      sex
      age
    }
  }
`);

const UPDATE_USER_LOCATION = print(gql`
  mutation UpdateUserLocation($input: UpdateLocationInput!) {
    updateLocation(input: $input) {
      id
      latitude
      longitude
    }
  }
`);

const UPDATE_LOCATION_AND_GET_USERS = print(gql`
  mutation UpdateLocationAndGetUsers($input: UpdateLocationInput!) {
    updateLocationGetUsers(input: $input) {
      id
    }
  }
`);

export {
  CREATE_USER,
  UPDATE_USER,
  SEND_NOD,
  RETURN_NOD,
  DELETE_ALL_USERS,
  REPORT,
  BLOCK,
  BECOME_INVISIBLE_TO,
  BECOME_VISIBLE_TO,
  UPDATE_SHOWME_CRITERIA,
  UPDATE_USER_LOCATION,
  UPDATE_LOCATION_AND_GET_USERS
};
