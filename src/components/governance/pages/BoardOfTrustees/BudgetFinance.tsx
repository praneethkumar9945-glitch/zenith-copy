import { useApp } from '@/components/governance/context';
import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import StatsCard from '@/components/governance/components/shared/StatsCard';
import ProgressBar from '@/components/governance/components/shared/ProgressBar';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`;
  return `₹${n.toLocaleString()}`;
}

export default function BudgetFinance() {
  const { budgetItems } = useApp();
  const totalAllocated = budgetItems.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgetItems.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = budgetItems.reduce((s, b) => s + b.remaining, 0);
  const overallPct = Math.round((totalSpent / totalAllocated) * 100);

  const barColors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500', 'bg-cyan-500', 'bg-orange-500', 'bg-teal-500'];

  return (
    <div>
      <SectionHeader title="Budget & Finance" subtitle="Annual budget allocation, expenditure, and financial overview" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <StatsCard title="Annual Budget" value={fmt(totalAllocated)} subtitle="FY 2024-25" icon={<DollarSign className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" layout="horizontal" />
        <StatsCard title="Total Spent" value={fmt(totalSpent)} subtitle={`${overallPct}% utilized`} icon={<TrendingUp className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
        <StatsCard title="Remaining" value={fmt(totalRemaining)} subtitle="Available balance" icon={<TrendingDown className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" layout="horizontal" />
        <StatsCard title="Departments" value={budgetItems.length} subtitle="Budget categories" icon={<PieChart className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" layout="horizontal" />
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
        {[
          { label: 'Fee Collection', value: '₹8.2 Cr', sub: 'Academic year 2024-25', change: '+5.1%', pos: true },
          { label: 'Research Grants', value: '₹1.8 Cr', sub: 'External funding received', change: '+18.3%', pos: true },
          { label: 'Other Income', value: '₹42 L', sub: 'Events, consultancy, misc.', change: '-2.1%', pos: false },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 min-w-0">
              <p className="text-xl font-bold text-slate-800 leading-none">{item.value}</p>
              <p className="text-sm text-slate-500 font-medium whitespace-nowrap">{item.label}</p>
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-400">{item.sub}</span>
              <span className={`font-semibold ${item.pos ? 'text-emerald-600' : 'text-red-500'}`}>{item.change} vs last year</span>
            </div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-2">
        <h3 className="text-base font-bold text-slate-800 mb-4">Overall Budget Utilization</h3>
        <ProgressBar value={overallPct} color={overallPct > 90 ? 'bg-red-500' : overallPct > 70 ? 'bg-amber-500' : 'bg-emerald-500'} />
        <div className="flex justify-between mt-3 text-sm text-slate-500">
          <span>Spent: <span className="font-semibold text-slate-700">{fmt(totalSpent)}</span></span>
          <span>Total: <span className="font-semibold text-slate-700">{fmt(totalAllocated)}</span></span>
        </div>
      </div>

      {/* Budget breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Category-Wise Budget Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Allocated</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Spent</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Remaining</th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase w-48">Utilization</th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.map((item, i) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${barColors[i % barColors.length]}`} />
                      <span className="font-medium text-slate-800">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-700">{fmt(item.allocated)}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-700">{fmt(item.spent)}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-emerald-600">{fmt(item.remaining)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <ProgressBar value={item.percentage} color={barColors[i % barColors.length]} showLabel={false} size="sm" />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-8 text-right">{item.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200">
                <td className="px-5 py-3.5 font-bold text-slate-800">Total</td>
                <td className="px-4 py-3.5 text-right font-bold text-slate-800">{fmt(totalAllocated)}</td>
                <td className="px-4 py-3.5 text-right font-bold text-slate-800">{fmt(totalSpent)}</td>
                <td className="px-4 py-3.5 text-right font-bold text-emerald-600">{fmt(totalRemaining)}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <ProgressBar value={overallPct} color="bg-blue-600" showLabel={false} size="sm" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 w-8 text-right">{overallPct}%</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}
