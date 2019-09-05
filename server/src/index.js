const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');
const isEmail = require('isemail');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');
const StpAPI = require('./datasources/stp');

const store = createStore();

const server = new ApolloServer({
    context: async ({ req }) => {
        store.headers = req.headers;
        return { request: req.headers };
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        launchAPI: new LaunchAPI(),
        stpAPI: new StpAPI({store}),
        userAPI: new UserAPI({store})
    })
});

server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`);
})