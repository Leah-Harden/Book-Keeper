
const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
}

input BookInput {
    bookId: String!
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
}

type Query {
    getUser: User
}
type Auth {
    token: ID!
    user: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput!): User
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth



}`


module.exports = typeDefs;
