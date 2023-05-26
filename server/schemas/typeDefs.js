
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql
  `type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book!]!
}

type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
}

input BookInput {
    title: String!
    author: String!
    description: String!
}

type Query {
    getUser(id: ID!): User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    saveBook(userId: ID!, book: BookInput!): User
}`

module.exports = typeDefs;
