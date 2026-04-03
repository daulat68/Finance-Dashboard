import { TrendingUp, TrendingDown, Wallet} from 'lucide-react';

const StatCard = ({ title, amount, type, trend }) => {
    const isIncome= type=== 'income';
    const isBalance= type=== "balance";

    return (
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${
                    isBalance 
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400' 
                        : isIncome 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                    {isBalance ? <Wallet size={20} /> : isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>

                <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full ${
                    trend>= 0 ?'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' 
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            </div>

            <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {title}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </h3>
            </div>
        </div>
    )
}

export default StatCard;