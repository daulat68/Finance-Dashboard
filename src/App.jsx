import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import DashboardCharts from './components/DashboardCharts';
import TransactionTable from './components/TransactionTable';
import { MOCK_TRANSACTIONS } from './data/mock_data'; 
import { useFinanceData } from './hooks/useFinanceData';
import { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import Insights from './pages/Insights'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  const {theme } = useStore();
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('royal_transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  const {summary, categoryData, trendData}= useFinanceData(transactions);

  useEffect(()=> {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(()=> {
    localStorage.setItem('royal_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleSaveTransaction = (newData) => {
    setTransactions(prev => {
      const exists = prev.find(t => t.id === newData.id);
      if (exists) {
        return prev.map(t => t.id === newData.id ? newData : t);
      }
      return [newData, ...prev];
    })
  }

  return(
    <div className="flex h-screen w-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar/>
        <main id="main-content" className="flex-1 overflow-y-auto custom-scrollbar">
            <Routes>
              <Route path="/" element={
                <div className="w-full pb-10">
                  <header className="mb-8 px-8 pt-8">
                    <h1 className="text-2xl font-bold tracking-normal text-slate-900 dark:text-white">
                      Financial Overview
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                      Welcome, here's what's happening with your money.
                    </p>
                  </header>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-6">
                    <StatCard title="Total Balance" amount={summary.totalBalance} type="balance" trend={12.5}/>
                    <StatCard title="Total Income" amount={summary.totalIncome} type="income" trend={8.2}/>
                    <StatCard title="Total Expenses" amount={summary.totalExpenses} type="expense" trend={-4.3} />
                  </div>

                  <div className="px-8 pb-8">
                    <DashboardCharts trendData={trendData} categoryData={categoryData} />
                  </div>

                  <div className="px-8 pb-8" id="recent-transactions">
                    <TransactionTable 
                      transactions={transactions}
                      onSave={handleSaveTransaction}
                    />
                  </div>
                </div>
              } />
              <Route path="/insights" element={<Insights transactions={transactions} />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
      </div>
    </div>
  );
}

export default App;