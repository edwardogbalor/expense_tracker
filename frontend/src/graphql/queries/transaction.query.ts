import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
	query GetTransactions {
		transactions {
			_id
			userId
			description
			transactionType
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
			userId
			description
			transactionType
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
		categoryBreakdown {
			category
			total
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

export function formatDate(dateValue: string | number) {
  const date = new Date(dateValue); // Handles both ISO string and timestamp
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}


