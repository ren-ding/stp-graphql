const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');
const StpAPI = require('./datasources/stp');

const server = new ApolloServer({
    context: ({ req }) => {
        return {headers: req.headers}
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        stpAPI: new StpAPI()
    })
});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})