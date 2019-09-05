const { gql } = require('apollo-server');
const typeDefs = gql`
    type Query {
        business(businessId: String!): Business!
        payruns(businessId: String!, startDate: String!, endDate: String!): Payruns!
    }

    type Business {
        id: ID!
        type: String!
        abn: String!
    }
    
    type Payruns {
        id: ID!
        type: String!
        submissionLogs: [Payrun!]! 
    }
    
    type Payrun {
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
`;

module.exports = typeDefs;
