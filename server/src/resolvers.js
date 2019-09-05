const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        launches: async (parent, args, ctx, info) => {
            const { pageSize = 20, after} = args;
            const { dataSources } = ctx;
            const allLaunches = await dataSources.launchAPI.getAllLaunches();
            allLaunches.reverse();
            const launches = paginateResults({
                after,
                pageSize,
                results:allLaunches
            });
            return {
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                hasMore: launches.length
                    ? launches[launches.length - 1].cursor !==
                      allLaunches[allLaunches.length - 1].cursor
                    : false,
                launches
            }
        },
        launch: (parent, args, ctx, info) => {
            const { id } = args;
            const { dataSources } = ctx;
            return dataSources.launchAPI.getLaunchById({launchId: id})
        },
        me: async (parent, args, ctx, info) => {
            const { dataSources } = ctx;
            dataSources.userAPI.findOrCreateUser()
        },
        business: (parent, args, ctx, info) => {
            const {businessId} = args;
            const {dataSources} = ctx;
            return dataSources.stpAPI.getBusinessById({businessId});
        },
        payruns: (parent, args, ctx, info) => {
            const {businessId, startDate, endDate} = args;
            const {dataSources} = ctx;

            return dataSources.stpAPI.getPayruns({businessId, startDate, endDate});
        }
    },
    Mutation: {
        login: async (parent, args, ctx, info) => {
            const { email } = args;
            const { dataSources } = ctx;
            const user = await dataSources.userAPI.findOrCreateUser({email});
            if(user) return Buffer.from(email).toString('base64');
        },
        bookTrips: async (parent, args, ctx, info) => {
            const { launchIds } = args;
            const { dataSources } = ctx;
            const results = await dataSources.userAPI.bookTrips({ launchIds });
            const launches = await dataSources.launchAPI.getLaunchesByIds({
                launchIds,
            });

            return {
                success: results && results.length === launchIds.length,
                message:
                results.length === launchIds.length
                    ? 'trips booked successfully'
                    : `the following launches couldn't be booked: ${launchIds.filter(
                        id => !results.includes(id),
                    )}`,
                launches,
            };
        },
        cancelTrip: async (parent, args, ctx, info) => {
            const { launchIds } = args;
            const { dataSources } = ctx;
            const result = await dataSources.userAPI.cancelTrip({ launchId });

            if (!result)
                return {
                success: false,
                message: 'failed to cancel trip',
                };

            const launch = await dataSources.launchAPI.getLaunchById({ launchId });
            return {
                success: true,
                message: 'trip cancelled',
                launches: [launch],
            };
        },
    },
    Mission: {
        missionPatch:(parent, args, ctx, info) => {
            const {mission} = parent;
            const {size = 'LARGE'} = args
            return size === 'SMALL'
                ? mission.missionPatchSmall
                : mission.missionPatchLarge;
        },
    },
    Launch: {
        isBooked: async (parent, args, ctx, info) => {
            const { dataSources } = ctx;
            return dataSources.userAPI.isBookedOnLaunch({ launchId: parent.id });
        }
    },
    User: {
        trips: async (parent, args, ctx, info) => {
            const { dataSources } = ctx;
            const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

            if(!launchIds.length) return [];

            return (dataSources.launchAPI.getLaunchesByIds({ launchIds }) || [] );
        }
    }
};
