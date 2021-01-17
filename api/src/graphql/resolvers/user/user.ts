const user = {
  outbound: (parent, _, context) => {
    const session = context.driver.session();
    const params = { id: parent.id };
    return session
      .run(
        `
                MATCH (sender: SocialNode { id: $id })-[r:NODDED_AT]->(recipient: SocialNode)
                WHERE NOT (recipient)-[:NODDED_AT]->(sender)
                MATCH (other: User { id: recipient.id })
                RETURN other`,
        params
      )
      .then((result) => {
        session.close();
        return result.records.map((record) => record.get('other').properties);
      });
  },
  inbound: (parent, _, context) => {
    const session = context.driver.session();
    const params = { id: parent.id };
    return session
      .run(
        `
            MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT]-(sender: SocialNode) 
            WHERE NOT (sender)<-[:NODDED_AT]-(recipient)
            MATCH (other: User { id: sender.id })
            RETURN other`,
        params
      )
      .then((result) => {
        session.close();
        return result.records.map((record) => record.get('other').properties);
      });
  },
  mutual: (parent, _, context) => {
    const session = context.driver.session();
    const params = { id: parent.id };
    return session
      .run(
        `
            MATCH (recipient: SocialNode { id: $id })<-[r:NODDED_AT]-(sender: SocialNode)
            WITH recipient, sender
            MATCH (sender)<-[r:NODDED_AT]-(recipient)
            WITH sender
            MATCH (other: User { id: sender.id })
            RETURN other`,
        params
      )
      .then((result) => {
        session.close();
        return result.records.map((record) => record.get('other').properties);
      });
  },
  showMeCriteria: (parent, _, context) => {
    const session = context.driver.session();
    const params = { id: parent.id };
    return session.run('MATCH (n: ShowMeCriteria { id: $id }) RETURN n', params).then((result) => {
      if (result.records == 0) {
        return [];
      }
      session.close();
      return result.records[0].get('n').properties;
    });
  }
};

export default user;
