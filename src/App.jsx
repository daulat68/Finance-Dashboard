import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import DashboardCharts from './components/DashboardCharts';
import TransactionTable from './components/TransactionTable';
import { MOCK_SUMMARY,MOCK_TRANSACTIONS,TREND_DATA, CATEGORY_DATA } from './data/mock_data'; 

function App(){
  return (
    <div className="flex min-h-screen w-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full">
            
            <header className="mb-8 px-8 pt-8">
              <h1 className="text-2xl font-bold tracking-normal text-slate-900">Financial Overview</h1>
              <p className="text-slate-500">Welcome, here's what's happening with your money.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-6">
              <StatCard title="Total Balance" amount={MOCK_SUMMARY.totalBalance} type="balance" trend={MOCK_SUMMARY.balanceTrend} />
              <StatCard title="Total Income" amount={MOCK_SUMMARY.totalIncome} type="income" trend={MOCK_SUMMARY.incomeTrend}/>
              <StatCard title="Total Expenses" amount={MOCK_SUMMARY.totalExpenses} type="expense" trend={MOCK_SUMMARY.expenseTrend} />
            </div>

            <div className="px-8 pb-8">
              <DashboardCharts trendData={TREND_DATA} categoryData={CATEGORY_DATA} />
            </div>
            <div className="px-8 pb-8">
              <TransactionTable transactions={MOCK_TRANSACTIONS}/>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;