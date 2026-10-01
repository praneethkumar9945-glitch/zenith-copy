import { useState } from 'react';
import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import StatusBadge from '@/components/governance/components/shared/StatusBadge';
import StatsCard from '@/components/governance/components/shared/StatsCard';
import Modal from '@/components/governance/components/shared/Modal';
import { Briefcase, Calendar } from 'lucide-react';

const DEALINGS = [
  { id: 'dl1', entity: 'AICTE', type: 'Regulatory', subject: 'Annual Compliance Submission 2023-24', date: '2024-06-30', status: 'Completed', outcome: 'Compliance approved. No adverse observations. NOC issued for new program.', contact: 'Dr. Rajiv Tyagi' },
  { id: 'dl2', entity: 'UGC', type: 'Regulatory', subject: 'Autonomous College Status Renewal', date: '2024-07-15', status: 'In Progress', outcome: 'Application submitted. Inspection committee visit scheduled for September 2024.', contact: 'Dr. M.K. Sharma' },
  { id: 'dl3', entity: 'NAAC', type: 'Accreditation', subject: 'Re-Accreditation Peer Team Visit', date: '2024-09-20', status: 'Scheduled', outcome: 'Documents prepared. Mock assessment conducted. Self-study report finalized.', contact: 'Prof. S. Ramaiah' },
  { id: 'dl4', entity: 'Ministry of Education', type: 'Government', subject: 'NIRF Ranking Data Submission', date: '2024-02-28', status: 'Completed', outcome: 'Secured Rank #85 in Engineering. Improvement from Rank #92 last year.', contact: 'Joint Secretary, MoE' },
  { id: 'dl5', entity: 'State Government', type: 'Government', subject: 'Land Lease Extension for Campus Expansion', date: '2024-07-01', status: 'In Progress', outcome: '30-acre lease extension applied. Revenue department inspection done. Decision awaited.', contact: 'District Collector Office' },
  { id: 'dl6', entity: 'Infosys Foundation', type: 'Industry', subject: 'CSR Grant for Smart Lab Infrastructure', date: '2024-05-10', status: 'Completed', outcome: 'Grant of ₹75L received for smart lab infrastructure in CSE and ECE departments.', contact: 'Ms. Sudha Murthy' },
  { id: 'dl7', entity: 'DRDO', type: 'Research', subject: 'Collaborative Project Agreement Renewal', date: '2024-07-20', status: 'Pending', outcome: 'Draft agreement under review. Meeting with DRDO director scheduled for August.', contact: 'Dr. G. Satheesh Reddy' },
];

const typeColors: Record<string, string> = {
  Regulatory: 'bg-red-100 text-red-700',
  Accreditation: 'bg-blue-100 text-blue-700',
  Government: 'bg-purple-100 text-purple-700',
  Industry: 'bg-emerald-100 text-emerald-700',
  Research: 'bg-amber-100 text-amber-700',
};

export default function Dealing() {
  const [selectedDealing, setSelectedDealing] = useState<(typeof DEALINGS)[number] | null>(null);
  const completed = DEALINGS.filter(d => d.status === 'Completed').length;
  const inProgress = DEALINGS.filter(d => d.status === 'In Progress').length;

  return (
    <div>
      <SectionHeader title="Dealing" subtitle="High-level engagements with government bodies, regulators, and external stakeholders" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <StatsCard title="Total Dealings" value={DEALINGS.length} icon={<Briefcase className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
        <StatsCard title="Completed" value={completed} icon={<Briefcase className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" layout="horizontal" />
        <StatsCard title="In Progress" value={inProgress} icon={<Briefcase className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" layout="horizontal" />
        <StatsCard title="Scheduled" value={DEALINGS.filter(d => d.status === 'Scheduled').length} icon={<Calendar className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" layout="horizontal" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Entity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {DEALINGS.map(d => (
                <tr key={d.id} onDoubleClick={() => setSelectedDealing(d)} title="Double-click for details" className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-bold text-slate-800">{d.entity}</p>
                    <p className="text-xs text-slate-500">Contact: {d.contact}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[d.type] ?? 'bg-slate-100 text-slate-600'}`}>{d.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700">{d.subject}</p>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-xs">{d.outcome}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{d.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDealing && (
        <Modal open={!!selectedDealing} onClose={() => setSelectedDealing(null)} title={selectedDealing.subject} subtitle={selectedDealing.entity} size="lg">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[selectedDealing.type] ?? 'bg-slate-100 text-slate-600'}`}>{selectedDealing.type}</span>
              <StatusBadge status={selectedDealing.status} />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: 'Entity', value: selectedDealing.entity },
                { label: 'Contact', value: selectedDealing.contact },
                { label: 'Date', value: selectedDealing.date },
                { label: 'Status', value: selectedDealing.status },
              ].map(detail => (
                <div key={detail.label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{detail.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{detail.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Outcome / Current Update</p>
              <p className="text-sm leading-6 text-slate-700">{selectedDealing.outcome}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
