module.exports = {
    Query: {
        business: async (parent, args, ctx, info) => {
            const {businessId} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getBusinessById({businessId});
        },
        listPayruns: async (parent, args, ctx, info) => {
            const {businessId, startDate, endDate} = args;
            const {dataSources} = ctx;
            const payruns = await dataSources.stpAPI.listPayruns({businessId, startDate, endDate});

            const submissionLogs = payruns.submissionLogs.map( async submission => {
                const payrun = dataSources.stpAPI.getPayrun({businessId,payrunId: submission.payrunId});
                return {...submission, payrun: payrun};
            });

            return {...payruns, submissionLogs: submissionLogs};
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
        },
        listEmployees2: (parent, args, ctx, info) => {
            const {businessId, year} = args;
            const {dataSources} = ctx;
            return dataSources.employees2API.listEmployees2({businessId, year});
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
