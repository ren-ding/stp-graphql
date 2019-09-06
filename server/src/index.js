const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const StpAPI = require('./datasources/stp');
const UserAPI = require('./datasources/user');

const server = new ApolloServer({
    context: ({ req }) => {
        return {headers: req.headers}
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        stpAPI: new StpAPI(),
        userAPI: new UserAPI()
    })
});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})