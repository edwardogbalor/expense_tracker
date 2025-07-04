import { DocumentNode } from '@apollo/client';
import { GET_TRANSACTIONS } from '../graphql/queries/transaction.query';
import { GET_CATEGORY_TOTALS } from '../graphql/queries/statistics.query';
import { GET_BALANCE_HISTORY, GET_CATEGORY_BREAKDOWN, GET_REMAINING_BUDGET, GET_MONTH_TO_DATE, GET_NET_WORTH } from '../graphql/queries/transaction.query';
import { GET_TOTAL_BALANCE } from '../graphql/queries/statistics.query';

export function useRefetchAllStats(): (string | DocumentNode)[] {
  return [
    GET_TRANSACTIONS,
    GET_CATEGORY_TOTALS,
    GET_BALANCE_HISTORY,
    GET_CATEGORY_BREAKDOWN,
    GET_TOTAL_BALANCE,
    GET_REMAINING_BUDGET,
    GET_MONTH_TO_DATE,
    GET_NET_WORTH,
  ];
} 