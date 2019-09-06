const { gql } = require('apollo-server');
const typeDefs = gql`
    type Query {
        business(businessId: String!): Business!
        listPayruns(businessId: String!, startDate: String!, endDate: String!): ListPayruns!
        getPayrun(businessId: String!, payrunId: String!): PayrunDetail!
        getUser(businessId: String!): UserDetail!
    }

    type Business {
        id: ID!
        type: String!
        abn: String!
    }
    
    type ListPayruns {
        id: ID!
        type: String!
        submissionLogs: [ListPayrunItem!]! 
    }
    
    type ListPayrunItem {
        payrunId: String!,
        submissionDate: String!,
        payOnDate: String!,
        employees: Int,
        startDate: String!,
        endDate: String!,
        grossPayment: Float!,
        payg: Int,
        declarationDate: String!,
        declaredBy: String!,
        submissionType: String!,
        status: String!
    }

    type PayrunDetail {
        id: String!
        type: String!
        status: String!
        payOnDate: String!
        startDate: String!
        endDate: String!
        declaredBy: String!
        abnGroup: String
        eventType: String!
    }

    type UserDetail {
        id: String!
        type: String!
        userId: String!
        globalId: String!
        agentAbn: String
        agentNumber: String
    }
`;

module.exports = typeDefs;
