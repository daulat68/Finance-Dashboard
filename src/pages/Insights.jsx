import {useFinanceData} from '../hooks/useFinanceData';
import {TrendingUp, Target, Zap, Award} from 'lucide-react';

const Insights = ({ transactions }) => {
    const { insights, summary } = useFinanceData(transactions);
    if (!insights || !insights.highestCategory) {
        return (
            <div className="p-8 flex items-center justify-center">
                <p className="text-slate-500 animate-pulse">Analyzing your data...</p>
            </div>
        )
    }

    const insightCards=[
        {
            title: "Top Spending",
            value: insights.highestCategory.name,
            subValue: `$${insights.highestCategory.value.toFixed(2)}`,
            icon: Target,
            color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-400"
        },
        {
            title: "Savings Rate",
            value: `${insights.savingsRate}%`,
            subValue: "Of total income",
            icon: Award,
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400"
        },
        {
            title: "Avg. Expense",
            value: `$${(summary.totalExpenses / transactions.filter(t => t.type === 'expense').length).toFixed(2)}`,
            subValue: "Per transaction",
            icon: Zap,
            color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400"
        }
    ]

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Financial Insights</h1>
                <p className="text-slate-500 dark:text-slate-400">Deep dive into your spending habits and patterns.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {insightCards.map((card, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.color}`}>
                            <card.icon size={24} />
                        </div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{card.title}</p>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</h2>
                        <p className="text-xs font-semibold text-slate-400 mt-1">{card.subValue}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                    <TrendingUp size={20} className="text-indigo-600" />
                    Monthly Spending Comparison
                </h3>
                <div className="space-y-6">
                    {Object.entries(insights.monthlyTotals).map(([month, amount]) => (
                        <div key={month}>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{month}</span>
                                <span className="font-bold text-slate-900 dark:text-white">${amount.toFixed(2)}</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                                <div 
                                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000" 
                                    style={{ width: `${(amount / 3000) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insights;