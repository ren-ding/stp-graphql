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

    type Mutation {
        payevent(payEvent: PayEvent): PayEventResponse!
    }

    input PayEvent {
        payrunId: String!,
        startDate: String!,
        endDate: String!,
        payOnDate: String!,
        submissionTime: String!,
        amendment: Boolean!,
        metadata: PayEventMetaData!,
        employerDetails: EmployerDetails!
        pays: [PayEventLine!]!
    }

    input PayEventMetaData {
        username: String!,
        userId: String!,
        software: String!,
        isOnlineProduct: String!,
        version: String!,
        region: String!
    }

    input EmployerDetails {
        globalId: String!,
        businessName: String!,
        abn: String,
        address: Address!
    }

    input Address {
        streetLine1: String,
        streetLine2: String,
        suburb: String!,
        state: String!,
        postcode: String!,
        country: String!
    }

    input PayEventLine {
        payId: String!,
        employeeDetails: EmployeeDetails!
        earnings: [EmployeeEarning!],
        deductions:[EmployeeDeduction!],
        taxes: [Tax!]
    }

    input EmployeeDetails {
        employeeId: String,
        firstName: String,
        lastName: String,
        birthDate: String,
        address: Address,
        tfnDeclaration: TfnDeclaration
    }

    input TfnDeclaration {
        tfn: String,
        paymentBasis: String,
        residencyStatus: String
    }

    input EmployeeEarning {
        name: String!,
        stpCategory: String!,
        amount: Float!,
        ytdAmount: Float!
    }

    input EmployeeDeduction {
        name: String!,
        stpCategory: String!,
        amount: Float!,
        ytdAmount: Float!,
        isTaxExempt: Boolean!
    }

    input Tax {
        name: String!,
        stpCategory: String!,
        amount: Float,
        ytdAmount: Float
    }

    type PayEventResponse {
        payrunId: String,
        status: String
    }
`;

module.exports = typeDefs;
