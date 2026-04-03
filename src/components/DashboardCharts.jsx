import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {useStore} from '../store/useStore';

const COLORS = ['#4f46e5', '#10b981', '#f43f5e','#f59e0b', '#8b5cf6', '#06b6d4'];

const DashboardCharts = ({trendData, categoryData}) =>{
    const { theme } = useStore();
    const isDark = theme === 'dark';
    const tooltipStyle = {
        contentStyle: {
            backgroundColor: isDark ? '#0f172a' : '#ffffff',
            borderRadius: '12px',
            border: isDark ? '1px solid #1e293b' : '1px solid #f1f5f9',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        },
        itemStyle: {
            color: isDark ? '#f8fafc' : '#0f172a',
            fontSize: '12px',
            fontWeight: '600'
        },
        labelStyle: {
            color: isDark ? '#94a3b8' : '#64748b',
            marginBottom: '4px'
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 min-w-0 overflow-hidden">
                <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Balance Trend</h3>
                <div className="w-full min-w-0">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={isDark ? 0.3 : 0.1} />
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                vertical={false} 
                                stroke={isDark ? '#1e293b' : '#f1f5f9'} 
                            />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }}/>
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 10 }}/>
                            <Tooltip {...tooltipStyle} />
                            <Area 
                                type="monotone" 
                                dataKey="amount" 
                                stroke="#4f46e5" 
                                strokeWidth={3} 
                                fillOpacity={1} 
                                fill="url(#colorValue)" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 min-w-0 overflow-hidden">
                <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">Spending Breakdown</h3>
                <div className="w-full min-w-0">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie 
                                data={categoryData} 
                                innerRadius={60} 
                                outerRadius={80} 
                                paddingAngle={5} 
                                dataKey="value"
                                stroke="none"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip {...tooltipStyle} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 space-y-3 max-h-32 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {categoryData.map((item, idx) => (
                        <div key={item.name} className="flex justify-between items-center text-sm gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <div 
                                    className="w-2.5 h-2.5 rounded-full shrink-0" 
                                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                ></div>
                                <span className="text-slate-600 dark:text-slate-400 font-medium truncate">{item.name}</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-slate-200 shrink-0">
                                ${item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardCharts;