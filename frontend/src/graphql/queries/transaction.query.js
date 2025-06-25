import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
	query GetTransactions {
		transactions {
			_id
			description
			paymentType
			category
			amount
			location
			date
		}
	}
`;

export const GET_TRANSACTION = gql`
	query GetTransaction($id: ID!) {
		transaction(transactionId: $id) {
			_id
			description
			paymentType
			category
			amount
			location
			date
			user {
				name
				username
				profilePicture
			}
		}
	}
`;

export const GET_TRANSACTION_STATISTICS = gql`
	query GetTransactionStatistics {
		categoryStatistics {
			category
			totalAmount
		}
	}
`;

export const GET_REMAINING_BUDGET = gql`
  query GetRemainingBudget {
    remainingBudget
  }
`;

export const GET_MONTH_TO_DATE = gql`
  query GetMonthToDate {
    monthToDate
  }
`;

export const GET_NET_WORTH = gql`
  query GetNetWorth {
    netWorth
  }
`;

export const GET_BALANCE_HISTORY = gql`
  query GetBalanceHistory {
    getBalanceHistory {
      date
      balance
    }
  }
`;

export const GET_CATEGORY_BREAKDOWN = gql`
  query GetCategoryBreakdown {
    categoryBreakdown {
      category
      total
    }
  }
`;


