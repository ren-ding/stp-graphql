const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        business: async (parent, args, ctx, info) => {
            const {businessId} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getBusinessById({businessId});
        },
        payruns: async (parent, args, ctx, info) => {
            const {businessId, startDate, endDate} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getPayruns({businessId, startDate, endDate});
        }
    },
    Mutation: {
        payevent: async (parent, args, ctx, info) => {
            const {payEvent} = args;
            const {dataSources} = ctx;
            
            return dataSources.stpAPI.postPayevent({message: payEvent});
        }
    }
};
