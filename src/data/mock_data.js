export const MOCK_SUMMARY = {
    totalBalance: 12500.50,
    totalIncome: 7200.00,
    totalExpenses: 2850.00,
    balanceTrend: 12.5,
    incomeTrend: 8.2,
    expenseTrend: -4.3
};

export const TREND_DATA = [
    { name: 'Mar 27', amount: 9800 },
    { name: 'Mar 28', amount: 10200 },
    { name: 'Mar 29', amount: 10100 },
    { name: 'Mar 30', amount: 11500 },
    { name: 'Mar 31', amount: 12000 },
    { name: 'Apr 01', amount: 12500 },
    { name: 'Apr 02', amount: 12500.50 },
];

export const CATEGORY_DATA = [
    { name: 'Housing', value: 1200 },
    { name: 'Food & Dining', value: 550 },
    { name: 'Shopping', value: 400 },
    { name: 'Entertainment', value: 300 },
    { name: 'Transport', value: 250 },
    { name: 'Tech Subs', value: 150 },
];

export const MOCK_TRANSACTIONS = [
  { 
    id: 1, 
    date: '2026-04-02', 
    amount: 350.00, 
    category: 'Food & Dining', 
    type: 'expense', 
    merchant: 'Dominos Pizza', 
    status: 'completed' 
  },
  { 
    id: 2, 
    date: '2026-04-01', 
    amount: 5000.00, 
    category: 'Salary', 
    type: 'income', 
    merchant: 'Mediaamp Tech', 
    status: 'completed' 
  },
  { 
    id: 3, 
    date: '2026-03-31', 
    amount: 1200.00, 
    category: 'Housing', 
    type: 'expense', 
    merchant: 'Skyline Heights', 
    status: 'completed' 
  },
  { 
    id: 4, 
    date: '2026-03-30', 
    amount: 85.20, 
    category: 'Transport', 
    type: 'expense', 
    merchant: 'Uber Technologies', 
    status: 'completed' 
  },
  { 
    id: 5, 
    date: '2026-03-29', 
    amount: 120.00, 
    category: 'Shopping', 
    type: 'expense', 
    merchant: 'Amazon.in', 
    status: 'pending' 
  },
  { 
    id: 6, 
    date: '2026-03-28', 
    amount: 250.00, 
    category: 'Entertainment', 
    type: 'expense', 
    merchant: 'Netflix Premium', 
    status: 'completed' 
  },
  { 
    id: 7, 
    date: '2026-03-27', 
    amount: 2200.00, 
    category: 'Freelance', 
    type: 'income', 
    merchant: 'Upwork Global', 
    status: 'completed' 
  },
  { 
    id: 8, 
    date: '2026-03-26', 
    amount: 45.00, 
    category: 'Food & Dining', 
    type: 'expense', 
    merchant: 'Starbucks Coffee', 
    status: 'completed' 
  },
  { 
    id: 9, 
    date: '2026-03-25', 
    amount: 150.00, 
    category: 'Tech Subs', 
    type: 'expense', 
    merchant: 'GitHub Copilot', 
    status: 'completed' 
  },
  { 
    id: 10, 
    date: '2026-03-24', 
    amount: 300.00, 
    category: 'Shopping', 
    type: 'expense', 
    merchant: 'Nike Store', 
    status: 'completed' 
  }
]