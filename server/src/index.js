const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const StpAPI = require('./datasources/stp');
const UserAPI = require('./datasources/user');
const Employees2API = require('./datasources/employees2');

const server = new ApolloServer({
    context: ({ req }) => {
        return {headers: req.headers}
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        stpAPI: new StpAPI(),
        userAPI: new UserAPI(),
        employees2API: new Employees2API()
    })
});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})