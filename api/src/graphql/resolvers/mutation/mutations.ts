import { preProcess, postProcess } from '../utils/parsers';

const mutations = {
  sendNod: (parent, args, context) => {
    const session = context.driver.session();
    const { from, to } = args.input;
    const params = {
      from,
      to,
      message: args.input?.message,
      latitude: args.input?.latitude,
      longitude: args.input?.longitude
    };
    return session
      .run(
        `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:NODDED_AT { from: $from, to: $to, initiator: true, seen: false, createdAt: timestamp(), message: $message, latitude: $latitude, longitude: $longitude }]->(b) 
                RETURN a.id, b.id, $message, $latitude, $longitude`,
        params
      )
      .then((result) => {
        session.close();
        if (result.records.length === 0) {
          return [];
        }
        return {
          from: result.records[0].get('a.id'),
          to: result.records[0].get('b.id'),
          message: result.records[0].get('$message'),
          latitude: result.records[0].get('$latitude'),
          longitude: result.records[0].get('$longitude')
        };
      });
  },
  returnNod: (parent, args, context) => {
    const session = context.driver.session();
    const { from, to } = args.input;
    const params = {
      from,
      to,
      message: args.input?.message,
      latitude: args.input?.latitude,
      longitude: args.input?.longitude
    };
    return session
      .run(
        `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:NODDED_AT { initiator: false, seen: false, createdAt: timestamp(), message: $message, latitude: $latitude, longitude: $longitude }]->(b) 
                RETURN a.id, b.id, $message, $latitude, $longitude`,
        params
      )
      .then((result) => {
        session.close();
        return {
          from: result.records[0].get('a.id'),
          to: result.records[0].get('b.id'),
          message: result.records[0].get('$message'),
          latitude: result.records[0].get('$latitude'),
          longitude: result.records[0].get('$longitude')
        };
      });
  },
  nodSeen: (parent, args, context) => {
    const session = context.driver.session();
    const params = { recipient: args.input.recipient, sender: args.input.sender };
    return session
      .run(
        'MATCH (a: SocialNode { id: $sender } )-[r:NODDED_AT]->(b: SocialNode { id: $recipient } ) SET r.seen = true RETURN $recipient, $sender',
        params
      )
      .then((result) => {
        session.close();
        return {
          sender: result.records[0].get('$sender'),
          recipient: result.records[0].get('$recipient')
        };
      });
  },
  deleteAllUsers: (parent, args, context) => {
    const session = context.driver.session();
    return session.run('MATCH (n) DETACH DELETE n').then((_) => {
      session.close();
      return 'Succesfully deleted all users';
    });
  },
  clearAllNods: (parent, args, context) => {
    const session = context.driver.session();
    return session.run('MATCH (n: SocialNode)-[edge:NODDED_AT]->(m: SocialNode) DETACH DELETE edge').then((_) => {
      session.close();
      return 'Succesfully deleted all nods';
    });
  },
  updateUser: (parent, args, context) => {
    const session = context.driver.session();
    const input = preProcess(args.input);
    const params = { id: args.input.id, input };
    return session.run('MATCH (n: User { id: $id }) SET n += $input RETURN n', params).then((result) => {
      session.close();
      const user = result.records[0].get(0).properties;
      return postProcess(user);
    });
  },
  createUser: (parents, args, context) => {
    const session = context.driver.session();
    const input = preProcess(args.input);
    const params = { id: args.input.id, input };
    const txc = session.beginTransaction();
    const promise = new Promise(async (resolve, reject) => {
      try {
        const userResult = await txc.run(
          'MERGE (n:User { id: $id }) ON CREATE SET n.created = timestamp(), n.latitude=0.0, n.longitude=0.0, n.isVisible=true, n += $input RETURN n',
          params
        );
        const rawUser = userResult.records[0].get(0).properties;
        const user = postProcess(rawUser);
        const _ = await txc.run(
          `
                MERGE (showmecriteria: ShowMeCriteria { id: $id }) 
                ON CREATE SET showmecriteria.sex = ["male", "female"], showmecriteria.age = [18, 100]
                RETURN showmecriteria`,
          params
        );
        const __ = await txc.run('MERGE (socialNode: SocialNode { id: $id }) RETURN socialNode', params);
        txc.commit();
        resolve(user);
      } catch (e) {
        reject(e);
        txc.rollback();
      } finally {
        session.close;
      }
    });
    return promise;
  },
  updateShowMeCriteria: (parents, args, context) => {
    const session = context.driver.session();
    const params = { id: args.input.id, input: args.input };
    return session
      .run('MERGE (n: ShowMeCriteria { id: $id }) ON MATCH SET n += $input RETURN n', params)
      .then((result) => {
        session.close();
        if (result.records == 0) {
          throw new Error(`No records for showme`);
        }
        return result.records[0].get(0).properties;
      })
      .catch((e) => {
        throw new Error(`SHOWME ERROR: ${e}`);
      });
  },
  deleteUser: (parent, args, context) => {
    const session = context.driver.session();
    return session.run('MATCH (n { id: $id }) DETACH DELETE n', { id: args.id }).then((_) => {
      session.close();
      return args.id;
    });
  },
  report: (parent, args, context) => {
    const session = context.driver.session();
    const { from, to, message, reason } = args.input;
    const params = {
      from,
      to,
      message: message === undefined ? '' : message,
      reason: reason === undefined ? '' : reason
    };
    return session
      .run(
        `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:REPORTED { createdAt: timestamp(), reason: $reason, message: $message }]->(b) 
                RETURN a.id, b.id, $reason, $message`,
        params
      )
      .then((result) => {
        session.close();
        if (result.records == 0) {
          throw new Error(`User with id ${args.from} or user with id ${args.to} does not exist in databse`);
        }
        return {
          from: result.records[0].get('a.id'),
          to: result.records[0].get('b.id'),
          reason: result.records[0].get('$reason'),
          message: result.records[0].get('$message')
        };
      });
  },
  unmatch: (parent, args, context) => {
    const session = context.driver.session();
    const { from, to, message, reason } = args.input;
    const params = {
      from,
      to,
      message: message === undefined ? '' : message,
      reason: reason === undefined ? '' : reason
    };
    return session
      .run(
        `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:UNMATCHED { createdAt: timestamp(), reason: $reason, message: $message }]->(b) 
                RETURN a.id, b.id, $reason, $message`,
        params
      )
      .then((result) => {
        session.close();
        if (result.records == 0) {
          throw new Error(`User with id ${args.from} or user with id ${args.to} does not exist in databse`);
        }
        return {
          from: result.records[0].get('a.id'),
          to: result.records[0].get('b.id'),
          reason: result.records[0].get('$reason'),
          message: result.records[0].get('$message')
        };
      });
  },
  becomeInvisibleTo: (parent, args, context) => {
    const session = context.driver.session();
    const { from, to } = args.input;
    const params = { from, to };
    return session
      .run(
        `MATCH (a: SocialNode),(b: SocialNode) 
                WHERE a.id = $from AND b.id = $to 
                CREATE (a)-[r:BECAME_INVISIBLE_TO { createdAt: timestamp() }]->(b) 
                RETURN a.id, b.id`,
        params
      )
      .then((result) => {
        session.close();
        if (result.records == 0) {
          throw new Error(`User with id ${args.from} or user with id ${args.to} does not exist in databse`);
        }
        return {
          from: result.records[0].get('a.id'),
          to: result.records[0].get('b.id')
        };
      });
  },
  becomeVisibleTo: (parent, args, context) => {
    const session = context.driver.session();
    const { from, to } = args.input;
    const params = { from, to };
    return session
      .run(
        `MATCH (a: SocialNode {id: $from})-[r:BECAME_INVISIBLE_TO]->(b: SocialNode {id: $to}) 
                WITH r,a,b
                DETACH DELETE r
                RETURN a.id, b.id`,
        params
      )
      .then((result) => {
        session.close();
        if (result.records == 0) {
          throw new Error(
            `User with id ${args.from} or user with id ${args.to} does not exist in databse OR user A was already visible to user B`
          );
        }
        return {
          from: result.records[0].get('a.id'),
          to: result.records[0].get('b.id')
        };
      });
  },
  updateLocationGetUsers: (parent, args, context) => {
    const session = context.driver.session();
    const params = { id: args.input.id, latitude: args.input.latitude, longitude: args.input.longitude };
    return session
      .run(
        `
            MATCH (n: User { id: $id }) 
            SET n.latitude = $latitude, n.longitude = $longitude 
            WITH n
            MATCH (requestor_criteria: ShowMeCriteria { id: $id }), (requestor: User { id: $id })
            WITH requestor, requestor_criteria
            MATCH (other: User), (other_criteria: ShowMeCriteria { id: other.id })
            WHERE distance(point({ longitude: $longitude, latitude: $latitude, height: 0 }), point({ latitude: other.latitude, longitude: other.longitude, height: 0 })) < 1000
            AND requestor.isVisible = true
            AND other.isVisible = true
            AND other.sex IN requestor_criteria.sex
            AND requestor.sex IN other_criteria.sex
            AND requestor.age IN range(other_criteria.age[0], other_criteria.age[1])
            AND other.age IN range(requestor_criteria.age[0], requestor_criteria.age[1])
            AND other.id <> requestor.id
            RETURN other
            `,
        params
      )
      .then((result) => {
        const users = result.records.map((record) => {
          const user = record.get(0).properties;
          return postProcess(user);
        });
        session.close();
        return users;
      });
  }
};

export default mutations;
