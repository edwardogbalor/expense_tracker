interface Transaction {
	category: string;
	amount: number;
}

export const calculateSummary = (transactions: Transaction[]) => {
    let income = 0;
    let expense = 0;
  
    transactions.forEach((txn: Transaction) => {
      if (txn.category.toLowerCase() === "saving") {
        income += txn.amount;
      } else if (txn.category.toLowerCase() === "expense") {
        expense += txn.amount;
      }
    });
  
    const totalBalance = income - expense;
    const remainingBudget = 800; // Replace with your logic if you want
    const monthToDate = income + expense; // Optional: sum of all txns this month
    const netWorth = totalBalance + 18000; // Fake static assets or future logic
  
    return {
      totalBalance,
      remainingBudget,
      monthToDate,
      netWorth,
    };
  };
  