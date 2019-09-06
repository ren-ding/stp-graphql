const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        business: (parent, args, ctx, info) => {
            const {businessId} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getBusinessById({businessId});
        },
        listPayruns: (parent, args, ctx, info) => {
            const {businessId, startDate, endDate} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.listPayruns({businessId, startDate, endDate});
        },
        getPayrun: (parent, args, ctx, info) => {
            const {businessId, payrunId} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getPayrun({businessId, payrunId});
        },
        getUser: (parent, args, ctx, info) => {
            const {businessId} = args;
            const {dataSources} = ctx;
            return dataSources.userAPI.getUser({businessId});
        }
    }
};
