import React,{ useState } from 'react';
import {Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useStore } from '../store/useStore';

const TransactionTable= ({ transactions }) => {
    const { role }= useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredData=transactions.filter(t => {
        const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType =filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mt-8 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-bold">Recent Transactions</h3>
            
            <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            
            <select 
                className="bg-slate-50 border-none rounded-xl text-sm px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            {role ==='admin' && (
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                + Add
                </button>
            )}
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                {role==='admin' && <th className="px-6 py-4 text-right">Actions</th>}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {filteredData.length > 0 ? (
                filteredData.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${t.type==='income'? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {t.type=== 'income'? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16} />}
                        </div>
                        <span className="font-semibold text-slate-700">{t.merchant}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{t.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{t.date}</td>
                    <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {t.type=== 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {t.status}
                        </span>
                    </td>
                    {role=== 'admin' && (
                        <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-indigo-600 text-xs font-medium">Edit</button>
                        </td>
                    )}
                    </tr>
                ))
                ): (
                <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    No transactions found matching your criteria.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </div>
    )
}
export default TransactionTable;