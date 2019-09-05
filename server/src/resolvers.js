const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        business: (parent, args, ctx, info) => {
            const {businessId} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getBusinessById({businessId});
        },
        payruns: (parent, args, ctx, info) => {
            const {businessId, startDate, endDate} = args;
            const {dataSources} = ctx;
            console.log(ctx);

            return dataSources.stpAPI.getPayruns({businessId, startDate, endDate});
        }
    }
};
