import { useState } from 'react';
import { Card, CardHeader, CardBody, StatCard } from '@/components/marketing-pr/components/ui/Card';
import { Badge, statusToVariant } from '@/components/marketing-pr/components/ui/Badge';
import { Table, type Column } from '@/components/marketing-pr/components/ui/Table';
import { Modal, Drawer } from '@/components/marketing-pr/components/ui/Drawer';
import { PageHeader, SearchInput, FilterDropdown, Button, InfoRow, SectionTitle, EmptyState } from '@/components/marketing-pr/components/ui/Common';
import { tasks as initialTasks } from '@/components/marketing-pr/data/mockData';
import type { Task, TaskStatus, Priority } from '@/components/marketing-pr/types';
import {
  Users, Target, CheckCircle2, Clock, AlertCircle,
  Plus, Send, Calendar, User,
} from 'lucide-react';

const teams = ['Digital Marketing Executive', 'Content / Brand Team', 'Events & Outreach Coordinator', 'PR / Media Team'];
const priorities: Priority[] = ['High', 'Medium', 'Low'];
const statuses: TaskStatus[] = ['Assigned', 'In Progress', 'Under Review', 'Completed'];

export function TeamCoordination() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);
  const [statusUpdateModal, setStatusUpdateModal] = useState<Task | null>(null);
  const [newStatus, setNewStatus] = useState<TaskStatus>('Assigned');

  // Create form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTeam: teams[0],
    priority: 'Medium' as Priority,
    dueDate: '',
  });

  const filtered = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = teamFilter === 'all' || t.assignedTeam === teamFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesTeam && matchesStatus;
  });

  const assigned = tasks.filter((t) => t.status === 'Assigned').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const underReview = tasks.filter((t) => t.status === 'Under Review').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  const handleCreate = () => {
    if (!form.title.trim() || !form.dueDate) return;
    const newTask: Task = {
      id: `T${String(tasks.length + 1).padStart(3, '0')}`,
      title: form.title,
      description: form.description,
      assignedTeam: form.assignedTeam as Task['assignedTeam'],
      priority: form.priority,
      dueDate: form.dueDate,
      status: 'Assigned',
      createdBy: 'Marketing Head / PRO',
      createdAt: new Date().toISOString().split('T')[0],
      progressNotes: [],
    };
    setTasks((prev) => [newTask, ...prev]);
    setForm({ title: '', description: '', assignedTeam: teams[0], priority: 'Medium', dueDate: '' });
    setShowCreate(false);
  };

  const handleUpdateStatus = () => {
    if (!statusUpdateModal) return;
    setTasks((prev) => prev.map((t) => t.id === statusUpdateModal.id ? { ...t, status: newStatus, progressNotes: [...(t.progressNotes || []), `Status updated to ${newStatus}`] } : t));
    setStatusUpdateModal(null);
  };

  const columns: Column<Task>[] = [
    { key: 'title', header: 'Task', render: (row) => <span className="font-medium text-foreground">{row.title}</span> },
    { key: 'team', header: 'Assigned Team', render: (row) => <Badge variant="slate">{row.assignedTeam}</Badge> },
    { key: 'priority', header: 'Priority', render: (row) => <Badge variant={row.priority === 'High' ? 'red' : row.priority === 'Medium' ? 'amber' : 'slate'}>{row.priority}</Badge> },
    { key: 'due', header: 'Due Date', render: (row) => <span className="text-muted-foreground text-xs">{row.dueDate}</span> },
    { key: 'status', header: 'Status', render: (row) => <Badge variant={statusToVariant(row.status)}>{row.status}</Badge> },
    { key: 'action', header: 'Action', render: (row) => (
      <button onClick={(e) => { e.stopPropagation(); setNewStatus(row.status); setStatusUpdateModal(row); }} className="text-xs text-primary hover:underline font-medium">
        Update Status
      </button>
    )},
  ];

  return (
    <div>
      <PageHeader
        title="Team Coordination"
        description="Review team activities, create and assign tasks, set priorities and due dates, and track task progress across teams."
        action={<Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowCreate(true)}>Create Task</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Assigned" value={assigned} icon={<Clock size={20} />} accent="amber" />
        <StatCard label="In Progress" value={inProgress} icon={<Target size={20} />} accent="blue" />
        <StatCard label="Under Review" value={underReview} icon={<AlertCircle size={20} />} accent="indigo" />
        <StatCard label="Completed" value={completed} icon={<CheckCircle2 size={20} />} accent="green" />
      </div>

      <Card>
        <CardHeader title="All Tasks" subtitle="Tasks assigned to all teams" icon={<Target size={18} />} />
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search tasks..." /></div>
          <FilterDropdown label="Team" value={teamFilter} options={teams} onChange={setTeamFilter} />
          <FilterDropdown label="Status" value={statusFilter} options={statuses} onChange={setStatusFilter} />
        </div>
        <Table columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No tasks found" />
      </Card>

      {/* Create Task Modal */}
      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create New Task"
        subtitle="Assign a task to a team with priority and due date"
        size="max-w-lg"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button variant="primary" icon={<Send size={16} />} onClick={handleCreate} disabled={!form.title.trim() || !form.dueDate}>Create & Assign</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Task Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter task title..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Description / Instructions</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Enter task instructions..."
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Responsible Team *</label>
              <select
                value={form.assignedTeam}
                onChange={(e) => setForm({ ...form, assignedTeam: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
              >
                {teams.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority *</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-card"
              >
                {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Due Date *</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </Modal>

      {/* Task Detail Drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Task Details"
        subtitle={selected?.title}
        footer={
          selected && (
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
              <Button variant="primary" onClick={() => { setNewStatus(selected.status); setStatusUpdateModal(selected); setSelected(null); }}>Update Status</Button>
            </div>
          )
        }
      >
        {selected && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={statusToVariant(selected.status)}>{selected.status}</Badge>
              <Badge variant={selected.priority === 'High' ? 'red' : selected.priority === 'Medium' ? 'amber' : 'slate'}>{selected.priority} Priority</Badge>
            </div>
            <InfoRow label="Task Title" value={selected.title} />
            <InfoRow label="Description" value={selected.description} />
            <InfoRow label="Assigned Team" value={selected.assignedTeam} />
            <InfoRow label="Created By" value={selected.createdBy} />
            <InfoRow label="Created Date" value={selected.createdAt} />
            <InfoRow label="Due Date" value={selected.dueDate} />
            <InfoRow label="Status" value={selected.status} />

            {selected.progressNotes && selected.progressNotes.length > 0 && (
              <div className="pt-3">
                <SectionTitle title="Progress Notes" />
                <div className="space-y-2">
                  {selected.progressNotes.map((note, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-background rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/100 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Update Status Modal */}
      <Modal
        open={!!statusUpdateModal}
        onClose={() => setStatusUpdateModal(null)}
        title="Update Task Status"
        subtitle={statusUpdateModal?.title}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setStatusUpdateModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleUpdateStatus}>Update Status</Button>
          </div>
        }
      >
        {statusUpdateModal && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select the new status for this task:</p>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    newStatus === s ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:bg-background'
                  }`}
                >
                  {s === 'Assigned' && <Clock size={16} />}
                  {s === 'In Progress' && <Target size={16} />}
                  {s === 'Under Review' && <AlertCircle size={16} />}
                  {s === 'Completed' && <CheckCircle2 size={16} />}
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
