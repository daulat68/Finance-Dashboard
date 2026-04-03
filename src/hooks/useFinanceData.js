import { useMemo } from 'react';
import {calculateFinanceSummary, calculateCategoryData, calculateTrendData } from '../utils/financeUtils';

export const useFinanceData = (transactions) => {
    const baseBalance= 0;

    return useMemo(()=> {
        const summary= calculateFinanceSummary(transactions, baseBalance);
        const categoryData= calculateCategoryData(transactions);
        const trendData= calculateTrendData(transactions, baseBalance);
        
        const highestCategory = categoryData.length > 0 
            ? [...categoryData].sort((a, b) => b.value - a.value)[0] 
            :{ name: 'N/A', value: 0 };

        const monthlyTotals = transactions.reduce((acc, t) => {
            const month = new Date(t.date).toLocaleString('default', { month: 'short' });
            if (t.type=== 'expense') {
                acc[month] = (acc[month] || 0) + t.amount;
            }
            return acc;
        }, {});

        const savingsRate= summary.totalIncome > 0 
            ? ((summary.totalIncome - summary.totalExpenses) / summary.totalIncome * 100).toFixed(1)
            : 0;

        return {
            summary,
            categoryData,
            trendData,
            insights: {
                highestCategory,
                monthlyTotals,
                savingsRate
            }
        };
    }, [transactions]); 
};