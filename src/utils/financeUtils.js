export const calculateFinanceSummary = (transactions, baseBalance) => {
    const income= transactions
        .filter(t=> t.type === 'income')
        .reduce((acc, curr) =>acc + curr.amount, 0);

    const expenses =transactions
        .filter(t=> t.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalBalance = baseBalance + income - expenses;

    return { totalBalance, totalIncome: income, totalExpenses: expenses };
}

export const calculateCategoryData = (transactions) => {
    const categoryMap = {};
    for (const t of transactions) {
        if (t.type === 'expense') {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        }
    }
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
}
export const calculateTrendData = (transactions, baseBalance) => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const trend = []
    let currentBalance = baseBalance
    for (const t of sorted) {
        currentBalance += (t.type === 'income' ? t.amount : -t.amount);
        trend.push({
        name: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        amount: currentBalance
        });
    }
    return trend
}