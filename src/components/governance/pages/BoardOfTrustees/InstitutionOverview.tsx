import { useState } from 'react';
import { Users, BookOpen, GraduationCap, Building2, TrendingUp, Award, Layers } from 'lucide-react';
import { useApp } from '@/components/governance/context';
import StatsCard from '@/components/governance/components/shared/StatsCard';
import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import Modal from '@/components/governance/components/shared/Modal';
import ProgressBar from '@/components/governance/components/shared/ProgressBar';
import { Department } from '@/components/governance/data';

export default function InstitutionOverview() {
  const { departments, students, faculty, enrollmentTrends } = useApp();
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const totalStudents = departments.reduce((s, d) => s + d.students, 0);
  const totalFaculty = departments.reduce((s, d) => s + d.faculty, 0);
  const totalCourses = departments.reduce((s, d) => s + d.courses.length, 0);
  const avgPassRate = Math.round(departments.reduce((s, d) => s + d.passRate, 0) / departments.length);

  return (
    <div>
      <SectionHeader
        title="Institution Overview"
        subtitle="Comprehensive view of Vishwavidyalaya Institute of Technology"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <StatsCard className="p-4" title="Total Students" value={totalStudents.toLocaleString()} subtitle="Across all departments" icon={<Users className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" trend={{ value: 2.5, label: 'vs last year' }} layout="horizontal" />
        <StatsCard className="p-4" title="Faculty Members" value={totalFaculty} subtitle="Full-time teaching staff" icon={<GraduationCap className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" trend={{ value: 4.2, label: 'vs last year' }} layout="horizontal" />
        <StatsCard className="p-4" title="Departments" value={departments.length} subtitle="Academic departments" icon={<Building2 className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
        <StatsCard className="p-4" title="Courses Offered" value={totalCourses} subtitle="UG, PG & PhD programs" icon={<BookOpen className="w-5 h-5 text-rose-600" />} iconBg="bg-rose-50" layout="horizontal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
        <StatsCard className="p-4" title="Avg. Pass Rate" value={`${avgPassRate}%`} subtitle="Across all departments" icon={<TrendingUp className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" trend={{ value: 1.8, label: 'vs last year' }} layout="horizontal" />
        <StatsCard className="p-4" title="Research Projects" value={departments.reduce((s, d) => s + d.researchProjects, 0)} subtitle="Active research projects" icon={<Layers className="w-5 h-5 text-cyan-600" />} iconBg="bg-cyan-50" trend={{ value: 10.5, label: 'vs last year' }} layout="horizontal" />
        <StatsCard className="p-4" title="Accreditations" value="NAAC A+" subtitle="Highest grade; NIRF Rank 85" icon={<Award className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
      </div>

      {/* Departments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 mb-2">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Departments</h3>
          <p className="text-xs text-slate-500 mt-0.5">Double-click a row to view full department details</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Head</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Faculty</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Students</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pass Rate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Accreditation</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr
                  key={dept.id}
                  onDoubleClick={() => setSelectedDept(dept)}
                  className="border-b border-slate-50 hover:bg-blue-50/40 cursor-pointer transition-colors"
                  title="Double-click for details"
                >
                  <td className="px-5 py-3.5 font-medium text-slate-800">{dept.name}</td>
                  <td className="px-4 py-3.5"><span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">{dept.code}</span></td>
                  <td className="px-4 py-3.5 text-slate-600">{dept.head}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-700">{dept.faculty}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-700">{dept.students}</td>
                  <td className="px-4 py-3.5 text-right">
                    <span className={`font-semibold ${dept.passRate >= 92 ? 'text-emerald-600' : dept.passRate >= 88 ? 'text-amber-600' : 'text-red-500'}`}>{dept.passRate}%</span>
                  </td>
                  <td className="px-4 py-3.5"><span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">{dept.accreditation}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrollment Trend */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="text-base font-bold text-slate-800 mb-4">Enrollment Trend (5 Years)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 text-xs font-semibold text-slate-500">Year</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500">Total</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500">UG</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500">PG</th>
                <th className="text-right py-2 text-xs font-semibold text-slate-500">PhD</th>
                <th className="py-2 px-4 text-right min-w-[88px] text-xs font-semibold text-slate-500">Growth</th>
              </tr>
            </thead>
            <tbody>
              {enrollmentTrends.map((row, i) => {
                const prev = enrollmentTrends[i - 1];
                const growth = prev
                  ? (((row.total - prev.total) / prev.total) * 100).toFixed(1)
                  : null;
                return (
                  <tr key={row.year} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-2.5 font-medium text-slate-700">{row.year}</td>
                    <td className="py-2.5 text-right font-bold text-slate-800">{row.total.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-slate-600">{row.ug.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-slate-600">{row.pg}</td>
                    <td className="py-2.5 text-right text-slate-600">{row.phd}</td>
                    <td className="py-2.5 px-4 text-right whitespace-nowrap">
                      {growth && <span className="text-emerald-600 font-semibold text-xs">+{growth}%</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Detail Modal */}
      {selectedDept && (
        <Modal open={!!selectedDept} onClose={() => setSelectedDept(null)} title={selectedDept.name} subtitle={`Department Code: ${selectedDept.code}`} size="xl">
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Head of Department', value: selectedDept.head },
                { label: 'Established', value: selectedDept.established },
                { label: 'Faculty Members', value: selectedDept.faculty },
                { label: 'Total Students', value: selectedDept.students },
                { label: 'Pass Rate', value: `${selectedDept.passRate}%` },
                { label: 'Research Projects', value: selectedDept.researchProjects },
                { label: 'Labs', value: selectedDept.labs },
                { label: 'Accreditation', value: selectedDept.accreditation },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="font-semibold text-slate-800 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-2">About the Department</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedDept.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-3">Courses Offered ({selectedDept.courses.length})</h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Course</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Code</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Type</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Credits</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Enrolled</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Pass %</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Instructor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDept.courses.map(c => (
                      <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-4 py-2.5 font-medium text-slate-700">{c.name}</td>
                        <td className="px-4 py-2.5 text-slate-500 font-mono text-xs">{c.code}</td>
                        <td className="px-4 py-2.5">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.type === 'UG' ? 'bg-blue-100 text-blue-700' : c.type === 'PG' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>{c.type}</span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-slate-600">{c.credits}</td>
                        <td className="px-4 py-2.5 text-right text-slate-700 font-medium">{c.enrolled}</td>
                        <td className="px-4 py-2.5 text-right font-semibold text-emerald-600">{c.passRate}%</td>
                        <td className="px-4 py-2.5 text-slate-600">{c.instructor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-3">Performance</h4>
              <ProgressBar value={selectedDept.passRate} label="Overall Pass Rate" color="bg-emerald-500" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
