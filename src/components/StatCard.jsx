import { TrendingUp, TrendingDown,Wallet} from 'lucide-react';

const StatCard = ({ title, amount, type, trend }) => {
    const isIncome = type=== 'income';
    const isBalance=type === "balance"

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2 rounded-lg ${isBalance ? 'bg-indigo-50 text-indigo-600' : isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {isBalance ? <Wallet size={20} /> : isIncome ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend> 0?'+' : ''}{trend}%
            </span>
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900">
            ${amount.toLocaleString( undefined, {minimumFractionDigits: 2 })}
            </h3>
        </div>
        </div>
    )
}
export default StatCard;