const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    phoneNumber: String
    firstname: String
    lastname: String
    bio: String
    whatAmIDoing: String
    isVisible: Boolean
    sex: String
    age: Int
    latitude: Float
    longitude: Float
    outbound: [User]
    inbound(filter: InboundFilterInput): [User]
    mutual: [User]
    email: String
    createdAt: Int
    updatedAt: Int
    showMeCriteria: ShowMeCriteria
    education: [Education]
    workExperience: [WorkExperience]
    hometown: String
    profileImageUrl: String
    gender: Gender
  }

  type Education {
    name: String
    entryYear: Int
    graduationYear: Int
    focus: String
    degree: Degree
  }

  input EducationInput {
    name: String
    entryYear: Int
    graduationYear: Int
    focus: String
    degree: Degree
  }

  enum Degree {
    highschool
    ms
    ma
    md
    phd
  }

  type WorkExperience {
    organizationName: String
    startYear: Int
    endYear: Int
    title: String
  }

  input WorkExperienceInput {
    organizationName: String
    startYear: Int
    endYear: Int
    title: String
  }

  input InboundFilterInput {
    seen: Boolean
  }

  type Query {
    user(id: ID!): User
    users(filter: ModelUserFilterInput): [User]
    getDistanceBetween(user1: ID!, user2: ID!): Float
    showMeCriteria(id: ID!): ShowMeCriteria
    getViableUsers(id: ID!): [User]
    getIncomingNods(id: ID!): [UserWithNod]
    getMatches(id: ID!): [User]
  }

  type Nod {
    createdAt: Int
    latitude: Float
    longitude: Float
    message: String
    initiator: Boolean
    seen: Boolean
  }

  type UserWithNod {
    user: User
    nod: Nod
  }

  input SendNodInput {
    from: ID!
    to: ID!
    message: String
    latitude: Float
    longitude: Float
  }

  type Mutation {
    sendNod(input: SendNodInput!): SendNodResponse
    returnNod(input: SendNodInput!): SendNodResponse
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): ID
    deleteAllUsers: String
    updateShowMeCriteria(input: UpdateShowMeCriteriaInput!): ShowMeCriteria
    nodSeen(input: NodSeenInput!): NodSeenResponse
    report(input: ReportInput!): ReportedResponse
    unmatch(input: UnmatchInput!): UnmatchResponse
    becomeInvisibleTo(input: BecomeInvisibleToInput!): BecomeInvisibleToResponse
    becomeVisibleTo(input: BecomeVisibleToInput!): BecomeVisibleToResponse
    updateLocationGetUsers(input: UpdateLocationInput!): [User]
    clearAllNods: String
  }

  input NodSeenInput {
    recipient: String!
    sender: String!
  }

  type Subscription {
    usersNearMe: [User]
  }

  input UpdateLocationInput {
    id: ID!
    latitude: Float!
    longitude: Float!
  }

  input ReportInput {
    from: ID!
    to: ID!
    reason: String
    message: String
    latitude: Float
    longitude: Float
  }

  input BecomeVisibleToInput {
    from: ID!
    to: ID!
  }

  type BecomeVisibleToResponse {
    from: ID
    to: ID
  }

  input BecomeInvisibleToInput {
    from: ID!
    to: ID!
  }

  type BecomeInvisibleToResponse {
    from: ID
    to: ID
  }

  input UnmatchInput {
    from: ID!
    to: ID!
    reason: String
    message: String
  }

  type ReportedResponse {
    from: ID
    to: ID
    reason: String
    message: String
  }

  type UnmatchResponse {
    from: ID!
    to: ID!
    reason: String
    message: String
  }

  type ShowMeCriteria {
    sex: [String]
    age: [Int]
  }

  input UpdateShowMeCriteriaInput {
    id: ID!
    sex: [String]
    age: [Int]
  }

  input UpdateUserInput {
    id: ID!
    email: String
    firstname: String
    lastname: String
    bio: String
    whatAmIDoing: String
    isVisible: Boolean
    sex: String
    phoneNumber: String
    age: Int
    latitude: Float
    longitude: Float
    education: [EducationInput]
    workExperience: [WorkExperienceInput]
    hometown: String
    profileImageUrl: String,
    gender: Gender
  }

  input CreateUserInput {
    id: ID!
    phoneNumber: String!
    firstname: String
    lastname: String
    bio: String
    whatAmIDoing: String
    latitude: Float
    longitude: Float
    isVisible: Boolean
    sex: String
    age: Int
    education: [EducationInput]
    workExperience: [WorkExperienceInput]
    hometown: String
    profileImageUrl: String,
    gender: Gender
  }

  enum Gender {
    man
    woman
  }

  type SendNodResponse {
    from: String
    to: String
    message: String
    latitude: Float
    longitude: Float
    createdAt: Int
  }

  type NodSeenResponse {
    recipient: String
    sender: String
  }

  enum ModelSortDirection {
    ASC
    DESC
  }

  input ModelStringInput {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    contains: String
    notContains: String
    between: [String]
    beginsWith: String
    attributeExists: Boolean
    attributeType: ModelAttributeTypes
    size: ModelSizeInput
  }

  enum ModelAttributeTypes {
    binary
    binarySet
    bool
    list
    map
    number
    numberSet
    string
    stringSet
    _null
  }

  input ModelIDInput {
    ne: ID
    eq: ID
    le: ID
    lt: ID
    ge: ID
    gt: ID
    contains: ID
    notContains: ID
    between: [ID]
    beginsWith: ID
    attributeExists: Boolean
    attributeType: ModelAttributeTypes
    size: ModelSizeInput
  }

  input ModelIntInput {
    ne: Int
    eq: Int
    le: Int
    lt: Int
    ge: Int
    gt: Int
    between: [Int]
    between_inclusive: [Int]
    attributeExists: Boolean
    attributeType: ModelAttributeTypes
  }

  input ModelFloatInput {
    ne: Float
    eq: Float
    le: Float
    lt: Float
    ge: Float
    gt: Float
    between: [Float]
    attributeExists: Boolean
    attributeType: ModelAttributeTypes
  }

  input ModelBooleanInput {
    ne: Boolean
    eq: Boolean
    attributeExists: Boolean
    attributeType: ModelAttributeTypes
  }

  input ModelSizeInput {
    ne: Int
    eq: Int
    le: Int
    lt: Int
    ge: Int
    gt: Int
    between: [Int]
  }

  input ModelUserFilterInput {
    id: ModelIDInput
    firstname: ModelStringInput
    lastname: ModelStringInput
    email: ModelStringInput
    bio: ModelStringInput
    whatAmIDoing: ModelStringInput
    location: ModelStringInput
    isVisible: ModelBooleanInput
    age: ModelIntInput
    sex: ModelStringInput
    and: [ModelUserFilterInput]
    or: [ModelUserFilterInput]
    not: ModelUserFilterInput
  }
`;

export default typeDefs;
