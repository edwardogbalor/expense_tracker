import { gql } from "@apollo/client";

export const GET_TOTAL_BALANCE = gql`
  query GetTotalBalance {
    totalBalance
  }

`;

export const GET_PAYMENT_BREAKDOWN = gql`
  query GetPaymentBreakdown {
    paymentBreakdown {
      paymentType
      total
    }
  }
`;


export const GET_CATEGORY_TOTALS = gql`
  query GetCategoryTotals {
    categoryTotals {
      category
      total
      percent
    }
  }
`;
