import { gql } from "@apollo/client";

export const CREATE_USER = gql`
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
        isVisible
        showMeCriteria {
            sex
            age
        }
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
}`

export const UPDATE_USER = gql`
mutation UpdateUser($input: UpdateUserInput!) {
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
        showMeCriteria {
            sex
            age
        }
    }
}`

export const SEND_NOD = gql`
mutation SendNod($input: SendNodInput!) {
    sendNod(input: $input ) {
        from
        to
        location
        message
    }
}`

export const RETURN_NOD = gql`
mutation ReturnNod($input: SendNodInput!) {
    returnNod(input: $input ) {
        from
        to
        location
        message
    }
}`

export const REPORT = gql`
mutation ReportUser($input: ReportInput!) {
    report(input: $input) {
        from
        to
        reason
        message
        latitude
        longitude
    }
}`

export const BLOCK = gql`
mutation BlockUser($input: BlockInput!) {
    block(input: $input) {
        from
        to
        reason
        message
    }
}`

export const BECOME_INVISIBLE_TO = gql`
mutation BecomeInvisibleTo($input: BecomeInvisibleToInput!) {
    becomeInvisibleTo(input: $input) {
        from
        to
    }
}`

export const BECOME_VISIBLE_TO = gql`
mutation BecomeInvisibleTo($input: BecomeVisibleToInput!) {
    becomeVisibleTo(input: $input) {
        from
        to
    }
}`

export const UPDATE_SHOWME_CRITERIA = gql`
mutation UpdateShowMeCriteria($input: UpdateShowMeCriteriaInput!) {
    updateShowMeCriteria(input: $input) {
        sex
        age
    }
}`

export const UPDATE_LOCATION_AND_GET_USERS = gql`
mutation UpdateLocationAndGetUsers($input: UpdateLocationInput!) {
    updateLocationGetUsers(input: $input) {
        id
        name
        bio
        whatAmIDoing
        sex
        age
        latitude
        longitude
    }
}`;