"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactionTypeDef = `#graphql
  type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    transactionType: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String
    date: String!
    user: User!
  }
  type CategoryTotal {
    category: String!
    total: Float!
    percent: Float!
  }

  type CategoryBreakdown {
    category: String!
    total: Float!
  }

  type BalancePoint {
  date: String!
  balance: Float!
}

  type Query {
    transactions: [Transaction!]
    transaction(transactionId:ID!): Transaction
    totalBalance: Float!
    categoryTotals: [CategoryTotal!]!
    categoryBreakdown: [CategoryBreakdown!]!
    remainingBudget: Float!
    monthToDate: Float!
    netWorth: Float!
    getBalanceHistory: [BalancePoint!]!
    #TODO => ADD categoryStatistics query
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateTransaction(input: UpdateTransactionInput!): Transaction!
    deleteTransaction(transactionId:ID!): Transaction!
  }

  input CreateTransactionInput {
    description: String!
    transactionType: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    transactionType: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }
`;
exports.default = transactionTypeDef;
