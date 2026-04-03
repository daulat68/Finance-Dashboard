import { AreaChart,Area, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';

const COLORS = ['#4f46e5','#10b981', '#f43f5e', '#f59e0b'];

const DashboardCharts = ({ trendData, categoryData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Balance Trend</h3>
            <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data= {trendData}>
                <defs>
                    <linearGradient id= "colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick= { {fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={ { borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Spending Breakdown</h3>
            <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
            {categoryData.map((item, idx) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={ { backgroundColor: COLORS[idx % COLORS.length] }}></div>
                    <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-900">${item.value}</span>
                </div>
            ))}
            </div>
        </div>
        </div>
    )
}

export default DashboardCharts;