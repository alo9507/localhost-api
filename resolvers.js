const { driver, session } = require('neo4j-driver')
const { toNumber } = require("./utils")

const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n:User) WHERE n.id=$id RETURN n', { id: args.id })
        .then((result) => {
          session.close()
          if (result.records == 0) { 
            throw new Error(`User with id ${args.id} does not exist in databse`) 
          }
          return result.records[0].get(0).properties
        })
    },
    users: (parent, args, context, info) => {
      const session = context.driver.session()
      return session.run('MATCH (n) RETURN n').then((result) => {
        const users = result.records.map((record) => record.get(0).properties)
        session.close()
        return users
      })
    },
    getDistanceBetween: (parent, args, context) => {
      const session = context.driver.session()
      return session
        .run('MATCH (user1:User), (user2:User) WHERE user1.id = $user1ID AND user2.id = $user2ID WITH point({ longitude: user1.longitude, latitude: user1.latitude }) AS user1Point, point({ longitude: user2.longitude, latitude: user2.latitude }) AS user2point RETURN round(distance(user1Point, user2point)) AS distanceBetweenUsers',{ user1ID: args.user1, user2ID: args.user2 })
        .then(result => {
          session.close()
          return result.records[0].get('distanceBetweenUsers')
        })
    }
  },
  User: {
    outbound: (parent, args, context, info) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n { id: $id })-[r:NODDED_AT]->(other:User) RETURN other', {
          id: parent.id,
        })
        .then((result) => {
          session.close()
          return result.records.map((record) => record.get('other').properties)
        })
    },
    outboundCount: (parent, args, context, info) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n { id: $id })-[r:NODDED_AT]->(:User) RETURN COUNT(r) AS outboundCount', {
          id: parent.id,
        })
        .then((result) => {
          session.close()
          return toNumber(result.records[0].get('outboundCount'))
        })
    },
    inbound: (parent, args, context, info) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n { id: $id })<-[r:NODDED_AT]-(other:User) RETURN other', {
          id: parent.id,
        })
        .then((result) => {
          session.close()
          return result.records.map((record) => record.get('other').properties)
        })
    },
    inboundCount: (parent, args, context, info) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n { id: $id })<-[r:NODDED_AT]-(:User) RETURN COUNT(r) AS inboundCount', {
          id: parent.id,
        })
        .then((result) => {
          session.close()
          return toNumber(result.records[0].get('inboundCount'))
        })
    },
  },
  Mutation: {
    message: (parent, args) => {
      return { message: args.message, success: true }
    },
    sendNod: (parent, args, context) => {
      const session = context.driver.session()
      return session
        .run(
          'MATCH (a:User),(b:User) WHERE a.id = $from AND b.id = $to CREATE (a)-[r:NODDED_AT]->(b) RETURN a.id, b.id',
          { from: args.from, to: args.to }
        )
        .then((result) => {
          session.close()
          return {
            from: result.records[0].get('a.id'),
            to: result.records[0].get('b.id'),
          }
        })
    },
    deleteAllUsers: (parent, args, context) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n) DETACH DELETE n')
        .then(result => {
          session.close()
          return "Succesfully deleted all users"
        })
    },
    updateUser: (parent, args, context) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n { id: $id }) SET n += $input RETURN n', { id: args.input.id, input: args.input })
        .then(result => {
          session.close()
          return result.records[0].get(0).properties
        })
    },
    createUser: (parents, args, context) => {
      const session = context.driver.session()
      return session
        .run('MERGE (n:User { id: $id }) ON CREATE SET n.created = timestamp(), n += $input RETURN n', { id: args.input.id, input: args.input })
        .then(result => {
          session.close()
          console.log(result.records[0].get(0).properties)
          return result.records[0].get(0).properties
        })
    },
    deleteUser: (parent, args, context) => {
      const session = context.driver.session()
      return session
        .run('MATCH (n { id: $id }) DETACH DELETE n', { id: args.id })
        .then(result => {
          session.close()
          return args.id
        })
    }
  },
}

module.exports = resolvers
