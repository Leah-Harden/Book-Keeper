const express = require('express')

// Import your GraphQL schema and resolvers
const typeDefs = require('./src/schema/schema');
const resolvers = require('./src/resolvers/resolvers');

const app = express()
const PORT = process.env.PORT || 3001

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });


// Start the server
app.listen(PORT, () =>
    console.log(`Server running at http://localhost:3001${server.graphqlPath}`)
);