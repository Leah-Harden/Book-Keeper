const express = require('express')
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');


// Import your GraphQL schema and resolvers
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const app = express()
const PORT = process.env.PORT || 3001


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/'));
})


// Start the server
const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer();

