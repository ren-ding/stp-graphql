const { gql } = require('apollo-server');
const typeDefs = gql`
    type Query {
        business(businessId: String!): Business!
        listPayruns(businessId: String!, startDate: String!, endDate: String!): ListPayruns!
        getPayrun(businessId: String!, payrunId: String!): PayrunDetail!
        getUser(businessId: String!): UserDetail!
        listEmployees2(businessId: String!, year: Int!): ListEmployees2!
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
        id: ID!
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
        id: ID!
        type: String!
        userId: String!
        globalId: String!
        agentAbn: String
        agentNumber: String
    }

    type ListEmployees2 {
        id: ID!
        type: String!
        payrunId: String
        employees: [ListEmployees2Item!]!
    }

    type ListEmployees2Item {
        payId: String
        employeeId: String!
        firstName: String!
        lastName: String!
        terminationDate: String
        financialYear: Float
        ytdGrossPay: Float
        ytdPayg: Float
        isFinalised: Boolean!
        rfbAmount: Float
        s57aRfbAmount: Float
    }
`;

module.exports = typeDefs;
