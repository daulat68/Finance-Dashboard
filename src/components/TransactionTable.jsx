import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownLeft, Pencil, Plus, Download } from 'lucide-react';
import { useStore } from '../store/useStore';
import TransactionModal from './TransactionModel';

const TransactionTable = ({ transactions, onSave }) => {
    const { role } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const handleAddClick = () => {
        setEditingTransaction(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleModalSave = (formData) => {
        onSave(formData); 
        setIsModalOpen(false);
    };

    const filteredData = transactions.filter(t => {
        const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
            t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
    });

    const downloadFile = (content, fileName, contentType) => {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const exportToCSV = () => {
        const headers = ['Merchant,Category,Date,Amount,Type,Status'];
        const rows = filteredData.map(t => 
            `${t.merchant},${t.category},${t.date},${t.amount},${t.type},${t.status}`
        );
        downloadFile([headers, ...rows].join("\n"), 'royal_transactions.csv', 'text/csv');
    };

    const exportToJSON = () => {
        downloadFile(JSON.stringify(filteredData, null, 2), 'royal_transactions.json', 'application/json');
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mt-8 overflow-hidden transition-all duration-300">
            
            <TransactionModal 
                key={editingTransaction?.id || 'new-transaction'} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleModalSave}
                initialData={editingTransaction} />

            <div className="p-4 sm:p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                    <div className="flex gap-3 mt-2">
                        <button 
                            onClick={exportToCSV} 
                            title="Export as CSV"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-100/50 dark:border-indigo-400/10 active:scale-95"
                        >
                            <Download size={14} /> CSV
                        </button>
                        <button 
                            onClick={exportToJSON} 
                            title="Export as JSON"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-100/50 dark:border-indigo-400/10 active:scale-95"
                        >
                            <Download size={14} /> JSON
                        </button>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18}/>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 w-full md:w-64 outline-none transition-colors"
                            onChange={(e)=> setSearchTerm(e.target.value)}/>
                    </div>
                    
                    <select 
                        className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    {role=== 'admin' && (
                        <button 
                            onClick={handleAddClick}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95 shadow-md shadow-indigo-200 dark:shadow-none"
                        >
                            <Plus size={16} /> <span className="hidden xs:inline">Add Transaction</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="text-slate-400 dark:text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                            <th className="px-6 py-4">Transaction</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            {role === 'admin' && <th className="px-6 py-4 text-right">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {filteredData.length > 0 ? (
                            filteredData.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${
                                                t.type === 'income' 
                                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                                                : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            }`}>
                                                {t.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                            </div>
                                            <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{t.merchant}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{t.category}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{t.date}</td>
                                    <td className={`px-6 py-4 font-bold text-sm ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                            t.status === 'completed' 
                                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' 
                                            : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'
                                        }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    {role === 'admin' && (
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleEditClick(t)}
                                                className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 ml-auto text-xs font-bold px-3 py-1 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"
                                            >
                                                <Pencil size={14} /> <span className="hidden xs:inline">Edit</span>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                                    No transactions found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransactionTable;