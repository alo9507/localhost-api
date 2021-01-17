import { generateQuery } from '../utils';

describe('Filter', () => {
  const _ = {
    id: 'abcd',
    name: 'Andrew',
    bio: "Here's my bio",
    whatAmIDoing: "Here's what I'm doing",
    isVisible: true,
    sex: 'male',
    age: 23,
    latitude: 12.1,
    longitude: 12.1,
    email: 'sdf@g.com'
  };

  // eq
  it('should return correct query for equality (string)', () => {
    const filter = { name: { eq: 'Andrew' } };
    expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name = 'Andrew' RETURN n");
  });

  it('should return correct query for equality (number)', () => {
    const filter = { age: { eq: 12 } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age = 12 RETURN n');
  });

  it('should return correct query for equality mixed number and string in same query', () => {
    const filter = { name: { eq: 'Andrew' }, age: { eq: 12 } };
    expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name = 'Andrew' AND n.age = 12 RETURN n");
  });

  it('should return correct query for equality (boolean)', () => {
    const filter = { isVisible: { eq: true } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.isVisible = true RETURN n');
  });

  // ne
  it('should return correct query for inequality (string)', () => {
    const filter = { name: { ne: 'Andrew' } };
    expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name <> 'Andrew' RETURN n");
  });

  it('should return correct query for inequality (number)', () => {
    const filter = { age: { ne: 12 } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age <> 12 RETURN n');
  });

  it('should return correct query for equality mixed number and string in same query', () => {
    const filter = { name: { ne: 'Andrew' }, age: { ne: 12 } };
    expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name <> 'Andrew' AND n.age <> 12 RETURN n");
  });

  it('should return correct query for equality and inequality same query', () => {
    const filter = { name: { ne: 'Andrew' }, age: { eq: 12 } };
    expect(generateQuery(filter)).toBe("MATCH (n: User) WHERE n.name <> 'Andrew' AND n.age = 12 RETURN n");
  });

  it('should return correct query for inequality (boolean)', () => {
    const filter = { isVisible: { ne: true } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.isVisible <> true RETURN n');
  });

  // le
  it('should return correct query for less than or equal', () => {
    const filter = { age: { le: 10 } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age <= 10 RETURN n');
  });

  // lt
  it('should return correct query for less than', () => {
    const filter = { age: { lt: 10 } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age < 10 RETURN n');
  });

  // ge
  it('should return correct query for greater than or equal', () => {
    const filter = { age: { ge: 10 } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age >= 10 RETURN n');
  });

  // gt
  it('should return correct query for greater than', () => {
    const filter = { age: { gt: 10 } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age > 10 RETURN n');
  });

  // between
  it('should return correct query for between', () => {
    const filter = { age: { between: [10, 20] } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age > 10 AND n.age < 20 RETURN n');
  });

  // between_inclusive
  it('should return correct query for between', () => {
    const filter = { age: { between_inclusive: [10, 20] } };
    expect(generateQuery(filter)).toBe('MATCH (n: User) WHERE n.age >= 10 AND n.age <= 20 RETURN n');
  });

  it('should return correct query for mixed values', () => {
    const filter = { isVisible: { eq: true }, sex: { eq: 'male' }, age: { between_inclusive: [10, 20] } };
    expect(generateQuery(filter)).toBe(
      "MATCH (n: User) WHERE n.isVisible = true AND n.sex = 'male' AND n.age >= 10 AND n.age <= 20 RETURN n"
    );
  });
});
