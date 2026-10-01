import { useState } from 'react';
import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import StatusBadge from '@/components/governance/components/shared/StatusBadge';
import ProgressBar from '@/components/governance/components/shared/ProgressBar';
import StatsCard from '@/components/governance/components/shared/StatsCard';
import Modal from '@/components/governance/components/shared/Modal';
import { Expand, BookOpen, Cpu, Building2 } from 'lucide-react';

const EXPANSIONS = [
  {
    id: 'ex1', category: 'New Programs', title: 'B.Tech Artificial Intelligence & Data Science', status: 'Approved',
    details: 'New 4-year B.Tech program with 60 seats. Curriculum co-designed with IIT Madras. Intake from 2024-25.',
    intake: 60, investment: '₹1.2 Cr', timeline: 'Aug 2024', lead: 'Academic Affairs', progress: 85,
  },
  {
    id: 'ex2', category: 'New Programs', title: 'M.Tech Cyber Security', status: 'Under Review',
    details: 'New PG program in Cyber Security with 30 seats. Industry collaboration with Infosys for curriculum.',
    intake: 30, investment: '₹60 L', timeline: 'Jan 2025', lead: 'CSE Dept', progress: 40,
  },
  {
    id: 'ex3', category: 'Infrastructure', title: 'New Academic Block — Phase II', status: 'Approved',
    details: '5-story academic block with 40 smart classrooms, 10 labs, and faculty cabins. Construction ongoing.',
    intake: 0, investment: '₹8 Cr', timeline: 'June 2025', lead: 'Admin Office', progress: 45,
  },
  {
    id: 'ex4', category: 'Technology', title: 'AI-Powered LMS Implementation', status: 'Ongoing',
    details: 'Institution-wide Learning Management System with AI-driven personalized learning paths for 2,440 students.',
    intake: 0, investment: '₹85 L', timeline: 'Dec 2024', lead: 'IT Dept', progress: 65,
  },
  {
    id: 'ex5', category: 'Capacity', title: 'Student Hostel Capacity Enhancement', status: 'Planned',
    details: 'New 500-bed hostel blocks for male and female students to meet growing residential demand.',
    intake: 500, investment: '₹6 Cr', timeline: 'Dec 2025', lead: 'Admin Office', progress: 10,
  },
  {
    id: 'ex6', category: 'New Programs', title: 'MBA – Healthcare Management', status: 'Pending',
    details: 'Specialized MBA track in Healthcare Management in collaboration with Apollo Hospitals.',
    intake: 40, investment: '₹50 L', timeline: 'July 2025', lead: 'MBA Dept', progress: 20,
  },
];

const catIcon: Record<string, JSX.Element> = {
  'New Programs': <BookOpen className="w-4 h-4 text-amber-600" />,
  'Technology': <Cpu className="w-4 h-4 text-amber-600" />,
  'Infrastructure': <Building2 className="w-4 h-4 text-amber-600" />,
  'Capacity': <Expand className="w-4 h-4 text-amber-600" />,
};

export default function Expansion() {
  const [expansions, setExpansions] = useState(EXPANSIONS);
  const [selectedExpansion, setSelectedExpansion] = useState<(typeof EXPANSIONS)[number] | null>(null);
  const approved = expansions.filter(e => e.status === 'Approved' || e.status === 'Ongoing').length;
  const pending = expansions.filter(e => e.status === 'Pending' || e.status === 'Under Review').length;
  const planned = expansions.filter(e => e.status === 'Planned').length;

  const updateStatus = (status: string) => {
    if (!selectedExpansion) return;
    const updated = { ...selectedExpansion, status };
    setExpansions(items => items.map(item => item.id === updated.id ? updated : item));
    setSelectedExpansion(updated);
  };

  return (
    <div>
      <SectionHeader title="Expansion" subtitle="New programs, infrastructure development, and capacity enhancement initiatives" />

      <div className="grid grid-cols-3 gap-2 mb-2">
        <StatsCard title="Approved / Active" value={approved} icon={<Expand className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
        <StatsCard title="Under Review" value={pending} icon={<Expand className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" layout="horizontal" />
        <StatsCard title="Planned" value={planned} icon={<Expand className="w-5 h-5 text-slate-500" />} iconBg="bg-slate-50" layout="horizontal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {expansions.map(item => (
          <div key={item.id} onDoubleClick={() => setSelectedExpansion(item)} title="Double-click for details" className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm transition-shadow cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {catIcon[item.category] ?? <Expand className="w-4 h-4 text-amber-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{item.category}</span>
                  <StatusBadge status={item.status} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">{item.details}</p>
            <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Investment</p>
                <p className="font-bold text-slate-700 mt-0.5">{item.investment}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Timeline</p>
                <p className="font-bold text-slate-700 mt-0.5">{item.timeline}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-slate-400">Lead</p>
                <p className="font-bold text-slate-700 mt-0.5">{item.lead}</p>
              </div>
            </div>
            <ProgressBar value={item.progress} color={item.progress >= 70 ? 'bg-emerald-500' : item.progress >= 40 ? 'bg-amber-500' : 'bg-slate-300'} showLabel={false} />
            <p className="text-xs text-slate-500 mt-1.5">Progress: {item.progress}%</p>
          </div>
        ))}
      </div>

      {selectedExpansion && (
        <Modal open={!!selectedExpansion} onClose={() => setSelectedExpansion(null)} title={selectedExpansion.title} subtitle={selectedExpansion.category} size="lg">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Current status</span>
              <StatusBadge status={selectedExpansion.status} />
            </div>
            <p className="text-sm leading-6 text-slate-600">{selectedExpansion.details}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Intake', value: selectedExpansion.intake ? `${selectedExpansion.intake} seats` : 'Not applicable' },
                { label: 'Investment', value: selectedExpansion.investment },
                { label: 'Timeline', value: selectedExpansion.timeline },
                { label: 'Lead', value: selectedExpansion.lead },
              ].map(detail => (
                <div key={detail.label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">{detail.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-800">{detail.value}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">Progress</span>
                <span className="text-sm font-bold text-amber-600">{selectedExpansion.progress}%</span>
              </div>
              <ProgressBar value={selectedExpansion.progress} color={selectedExpansion.progress >= 70 ? 'bg-emerald-500' : selectedExpansion.progress >= 40 ? 'bg-amber-500' : 'bg-slate-300'} showLabel={false} />
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-3 text-sm font-semibold text-slate-700">Update status</p>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => updateStatus('Approved')} className="rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-emerald-700">Approve</button>
                <button onClick={() => updateStatus('Ongoing')} className="rounded-lg bg-amber-500 px-3 py-2.5 text-sm font-medium text-white hover:bg-amber-600">Ongoing</button>
                <button onClick={() => updateStatus('Pending')} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">Pending</button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
