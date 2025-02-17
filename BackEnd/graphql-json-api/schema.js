const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    gender: String!
    dateOfBirth: String!
    email: String!
    country: String!
    course: String!
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
  }

  input StudentInput {
    firstName: String!
    lastName: String!
    age: Int!
    email: String!
    course: String
    gender: String
    dateOfBirth: String
    country: String
  }

  type Mutation {
    createStudent(input: StudentInput!): Student
    updateStudent(id: ID!, input: StudentInput!): Student
    deleteStudent(id: ID!): Student
  }
`;

module.exports = typeDefs;
