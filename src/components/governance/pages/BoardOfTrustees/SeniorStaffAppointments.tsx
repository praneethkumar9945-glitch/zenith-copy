import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { useApp } from '@/components/governance/context';
import { Appointment } from '@/components/governance/data';
import SectionHeader from '@/components/governance/components/shared/SectionHeader';
import StatusBadge from '@/components/governance/components/shared/StatusBadge';
import Modal from '@/components/governance/components/shared/Modal';
import StatsCard from '@/components/governance/components/shared/StatsCard';
import { UserCheck, Clock, CheckCircle, XCircle } from 'lucide-react';

function AppointmentForm({ appt, onSave, onClose }: { appt?: Appointment; onSave: (a: Appointment) => void; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Appointment>>(appt ?? { status: 'Pending' });
  const set = (k: keyof Appointment, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name *</label>
          <input value={form.name ?? ''} onChange={e => set('name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Position *</label>
          <input value={form.position ?? ''} onChange={e => set('position', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
          <input value={form.department ?? ''} onChange={e => set('department', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Qualification</label>
          <input value={form.qualification ?? ''} onChange={e => set('qualification', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Experience (yrs)</label>
          <input type="number" value={form.experience ?? ''} onChange={e => set('experience', parseInt(e.target.value) || 0)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Appointment Date</label>
          <input type="date" value={form.appointmentDate ?? ''} onChange={e => set('appointmentDate', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
          <select value={form.status ?? ''} onChange={e => set('status', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            {['Approved', 'Pending', 'Under Review'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
        <button onClick={() => { if (!form.name || !form.position) return; onSave({ ...form, id: appt?.id ?? `ap${Date.now()}` } as Appointment); }} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {appt ? 'Update' : 'Add Appointment'}
        </button>
      </div>
    </div>
  );
}

export default function SeniorStaffAppointments() {
  const { appointments, updateAppointment, addAppointment } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editAppt, setEditAppt] = useState<Appointment | undefined>(undefined);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | undefined>(undefined);

  const counts = {
    total: appointments.length,
    approved: appointments.filter(a => a.status === 'Approved').length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    review: appointments.filter(a => a.status === 'Under Review').length,
  };

  const updateAppointmentStatus = (status: Appointment['status']) => {
    if (!selectedAppt) return;
    const updatedAppointment = { ...selectedAppt, status };
    updateAppointment(updatedAppointment);
    setSelectedAppt(updatedAppointment);
  };

  return (
    <div>
      <SectionHeader
        title="Senior Staff Appointments"
        subtitle="Review and approve senior management appointments"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <StatsCard title="Total Appointments" value={counts.total} icon={<UserCheck className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" layout="horizontal" />
        <StatsCard title="Approved" value={counts.approved} icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" layout="horizontal" />
        <StatsCard title="Pending" value={counts.pending} icon={<Clock className="w-5 h-5 text-amber-600" />} iconBg="bg-amber-50" layout="horizontal" />
        <StatsCard title="Under Review" value={counts.review} icon={<Clock className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" layout="horizontal" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Position</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Qualification</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Exp.</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appt => (
                <tr key={appt.id} onDoubleClick={() => setSelectedAppt(appt)} className="border-b border-slate-50 hover:bg-blue-50 cursor-pointer transition-colors duration-150">
                  <td className="px-5 py-3 font-medium text-slate-800">{appt.name}</td>
                  <td className="px-4 py-3 text-slate-700">{appt.position}</td>
                  <td className="px-4 py-3 text-slate-600">{appt.department}</td>
                  <td className="px-4 py-3 text-slate-600">{appt.qualification}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{appt.experience} yrs</td>
                  <td className="px-4 py-3 text-slate-500">{appt.appointmentDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={appt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={showForm} onClose={() => setShowForm(false)} title={editAppt ? 'Edit Appointment' : 'New Appointment'} size="lg">
        <AppointmentForm
          appt={editAppt}
          onSave={a => { editAppt ? updateAppointment(a) : addAppointment(a); setShowForm(false); }}
          onClose={() => setShowForm(false)}
        />
      </Modal>

      <Modal open={!!selectedAppt} onClose={() => setSelectedAppt(undefined)} title="Appointment Details" size="lg">
        {selectedAppt && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Full Name</label>
                <p className="text-slate-800 font-medium">{selectedAppt.name}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Position</label>
                <p className="text-slate-800 font-medium">{selectedAppt.position}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Department</label>
                <p className="text-slate-700">{selectedAppt.department}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Qualification</label>
                <p className="text-slate-700">{selectedAppt.qualification}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Experience</label>
                <p className="text-slate-700 font-medium">{selectedAppt.experience} years</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Appointment Date</label>
                <p className="text-slate-700 font-medium">{selectedAppt.appointmentDate}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase">Status</label>
                <StatusBadge status={selectedAppt.status} />
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <button onClick={() => updateAppointmentStatus('Pending')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors">
                <Clock className="w-4 h-4" /> Mark Pending
              </button>
              <button onClick={() => updateAppointmentStatus('Rejected')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                <XCircle className="w-4 h-4" /> Reject
              </button>
              <button onClick={() => updateAppointmentStatus('Approved')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
                <CheckCircle className="w-4 h-4" /> Approve
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
