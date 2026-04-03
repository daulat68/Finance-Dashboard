import {useState} from 'react';
import {X} from 'lucide-react';

const TransactionModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        merchant: '',
        amount: '',
        category: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        status: 'completed'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onSave({ 
        ...formData, 
        amount: parseFloat(formData.amount), 
        id: initialData?.id || Date.now() 
        });
        
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">
                {initialData ? 'Edit Transaction' : 'Add Transaction'}
            </h3>
            <button 
                type="button" 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={24}/>
            </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Merchant</label>
                <input 
                required
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.merchant}
                onChange={(e) => setFormData({...formData, merchant: e.target.value})}
                placeholder="e.g. Apple Store"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Amount ($)</label>
                <input 
                    required
                    type="number"
                    step="0.01"
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
                </div>
                <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                <select 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input 
                required
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="e.g. Shopping"/>
            </div>

            <div className="pt-4 flex gap-3">
                <button 
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors active:scale-95">
                Cancel
                </button>
                <button 
                type="submit"
                className="flex-1 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 active:scale-95">
                {initialData ? 'Save Changes' : 'Add Entry'}
                </button>
            </div>
            </form>
        </div>
        </div>
    )
}

export default TransactionModal;