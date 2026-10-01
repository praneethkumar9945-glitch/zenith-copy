import { useState } from 'react';
import { useApp } from '@/components/governance/context';
import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import StatsCard from '@/components/governance/components/shared/StatsCard';
import Modal from '@/components/governance/components/shared/Modal';
import { Award, Star, Trophy, Microscope, Dumbbell } from 'lucide-react';

const categoryIcons: Record<string, JSX.Element> = {
  Award: <Trophy className="w-5 h-5 text-amber-600" />,
  Ranking: <Star className="w-5 h-5 text-blue-600" />,
  Accreditation: <Award className="w-5 h-5 text-emerald-600" />,
  Research: <Microscope className="w-5 h-5 text-purple-600" />,
  Sports: <Dumbbell className="w-5 h-5 text-rose-600" />,
};

const categoryBg: Record<string, string> = {
  Award: 'bg-amber-50 border-amber-100',
  Ranking: 'bg-blue-50 border-blue-100',
  Accreditation: 'bg-emerald-50 border-emerald-100',
  Research: 'bg-purple-50 border-purple-100',
  Sports: 'bg-rose-50 border-rose-100',
};

export default function InstitutionalAchievements() {
  const { achievements } = useApp();
  const [selectedAchievement, setSelectedAchievement] = useState<(typeof achievements)[number] | null>(null);

  const counts = {
    total: achievements.length,
    awards: achievements.filter(a => a.category === 'Award').length,
    rankings: achievements.filter(a => a.category === 'Ranking').length,
    accreditations: achievements.filter(a => a.category === 'Accreditation').length,
  };

  return (
    <div>
      <SectionHeader title="Institutional Achievements" subtitle="Awards, rankings, accreditations, and recognitions" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <StatsCard title="Total Achievements" value={counts.total} icon={<Award className="w-5 h-5 text-cyan-600" />} iconBg="bg-cyan-50" layout="horizontal" />
        <StatsCard title="Awards" value={counts.awards} icon={<Trophy className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
        <StatsCard title="Rankings" value={counts.rankings} icon={<Star className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" layout="horizontal" />
        <StatsCard title="Accreditations" value={counts.accreditations} icon={<Award className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" layout="horizontal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {achievements.map(ach => (
          <div
            key={ach.id}
            onDoubleClick={() => setSelectedAchievement(ach)}
            title="Double-click for details"
            className={`bg-white rounded-2xl border p-5 hover:shadow-md transition-shadow cursor-pointer ${categoryBg[ach.category] ?? 'bg-white border-slate-200'}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-100">
                {categoryIcons[ach.category]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">{ach.title}</h3>
                  <span className="text-xs text-slate-500 flex-shrink-0">{ach.date}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Awarded by: <span className="font-medium text-slate-600">{ach.awardedBy}</span></p>
                <p className="text-sm text-slate-600 leading-relaxed">{ach.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAchievement && (
        <Modal
          open={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          title={selectedAchievement.title}
          subtitle={`${selectedAchievement.category} recognition`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">Category</p>
                <p className="font-semibold text-slate-800 text-sm">{selectedAchievement.category}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">Date</p>
                <p className="font-semibold text-slate-800 text-sm">{selectedAchievement.date}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 col-span-2">
                <p className="text-xs text-slate-500 mb-1">Awarded By</p>
                <p className="font-semibold text-slate-800 text-sm">{selectedAchievement.awardedBy}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="text-sm font-bold text-slate-700 mb-2">Achievement Details</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedAchievement.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
