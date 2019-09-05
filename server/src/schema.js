const { gql } = require('apollo-server');
const typeDefs = gql`
    type Query {
        launches(
            pageSize: Int
            after: String
        ): LaunchConnection!
        launch(id: ID!): Launch
        me: User
        business(businessId: String!): Business!
    }

    type Business {
        id: ID!
        type: String!
        abn: String!
    }

    type LaunchConnection {
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

    type Launch {
        id:ID!
        site:String
        mission:Mission
        rocket:Rocket
        isBooked:Boolean!
    }

    type Rocket {
        id:ID!
        name:String
        type:String
    }

    type User {
        id: ID!
        email:String!
        trips:[Launch]!
    }

    type Mission {
        name:String
        missionPatch(mission: String, size: PatchSize): String
    }

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String
    }

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches:[Launch]
    }

    enum PatchSize {
        SMALL
        LARGE
    }
`;

module.exports = typeDefs;
