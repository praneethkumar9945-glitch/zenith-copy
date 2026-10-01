import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import { FileText, Download, Eye } from 'lucide-react';
import StatusBadge from '@/components/governance/components/shared/StatusBadge';

const REPORTS = [
  { id: 'r1', title: 'Annual Performance Report 2023-24', type: 'Annual', date: '2024-06-30', pages: 84, status: 'Approved', preparedBy: 'IQAC Cell', summary: 'Comprehensive institutional performance including academic, research, financial, and infrastructure highlights.' },
  { id: 'r2', title: 'Financial Audit Report 2023-24', type: 'Financial', date: '2024-05-15', pages: 52, status: 'Approved', preparedBy: 'Finance Dept', summary: 'Certified financial statements with income, expenditure, balance sheet, and audit observations.' },
  { id: 'r3', title: 'Strategic Plan 2025-2030', type: 'Strategic', date: '2024-07-01', pages: 68, status: 'Under Review', preparedBy: 'Planning Committee', summary: 'Five-year strategic roadmap covering academics, research, infrastructure, and international outreach.' },
  { id: 'r4', title: 'Q1 Academic Performance Report 2024', type: 'Academic', date: '2024-04-30', pages: 28, status: 'Approved', preparedBy: 'Examination Cell', summary: 'First quarter results summary with pass rates, top performers, and improvement areas by department.' },
  { id: 'r5', title: 'Research & Development Annual Report', type: 'Research', date: '2024-06-15', pages: 44, status: 'Approved', preparedBy: 'Research Cell', summary: 'Publications, patents, funded projects, collaborations, and researcher profiles for 2023-24.' },
  { id: 'r6', title: 'NAAC Self-Study Report 2024', type: 'Accreditation', date: '2024-07-10', pages: 220, status: 'Pending', preparedBy: 'NAAC Committee', summary: 'Comprehensive self-study report submitted to NAAC for re-accreditation process.' },
];

const typeColors: Record<string, string> = {
  Annual: 'bg-blue-100 text-blue-700',
  Financial: 'bg-emerald-100 text-emerald-700',
  Strategic: 'bg-purple-100 text-purple-700',
  Academic: 'bg-amber-100 text-amber-700',
  Research: 'bg-cyan-100 text-cyan-700',
  Accreditation: 'bg-rose-100 text-rose-700',
};

export default function ExecutiveReports() {
  return (
    <div>
      <SectionHeader title="Executive Reports" subtitle="Annual performance, financial, strategic, and research reports" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Reports', value: REPORTS.length },
          { label: 'Approved', value: REPORTS.filter(r => r.status === 'Approved').length },
          { label: 'Under Review', value: REPORTS.filter(r => r.status === 'Under Review' || r.status === 'Pending').length },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-3xl font-bold text-slate-800">{s.value}</p>
            <p className="text-slate-600 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {REPORTS.map(report => (
          <div key={report.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-800 text-sm">{report.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[report.type] ?? 'bg-slate-100 text-slate-600'}`}>{report.type}</span>
                    <StatusBadge status={report.status} />
                  </div>
                  <p className="text-xs text-slate-500 mb-2">Prepared by: {report.preparedBy} · {report.date} · {report.pages} pages</p>
                  <p className="text-sm text-slate-600">{report.summary}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
