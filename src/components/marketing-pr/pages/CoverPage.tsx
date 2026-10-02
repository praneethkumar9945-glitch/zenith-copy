import type { RoleConfig } from '@/components/layout/Sidebar';
import { GraduationCap } from 'lucide-react';
import type { ReactNode } from 'react';

const roleDescriptions: Record<string, string> = {
  'marketing-head': 'Oversee branding, PR, campaigns, and digital marketing performance',
  'sales': 'Manage leads, enquiries, follow-ups, counselling, and admissions conversion',
  'digital': 'Run digital campaigns, website, social media, SEO, and lead generation',
  'content': 'Create and manage content, materials, social media, and brand assets',
  'events': 'Plan events, school outreach, partnerships, and outreach lead generation',
};

export function CoverPage({
  roles,
  onSelectRole,
  sidebarCollapsed,
}: {
  roles: RoleConfig[];
  onSelectRole: (roleId: string) => void;
  sidebarCollapsed: boolean;
}) {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex flex-col items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <GraduationCap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Marketing, Admissions & PR</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl mx-auto">
              Manage and coordinate marketing, admissions, branding, public relations, digital promotion, content, events and outreach activities.
            </p>
          </div>
        </div>
      </div>

      {/* Select Role */}
      <div className="mb-5 text-center">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Select Role</h2>
      </div>

      {/* Role Cards */}
      <div className="grid max-w-5xl mx-auto grid-cols-6 gap-2">
        {roles.map((r, index) => (
          <button
            key={r.id}
            onClick={() => onSelectRole(r.id)}
            className={`group col-span-2 bg-card rounded-xl border border-border shadow-sm p-5 text-left hover:border-blue-300 hover:shadow-md transition-all ${
              index === 3 ? 'col-start-2' : index === 4 ? 'col-start-4' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${r.color}`}>
                {cloneIcon(r.icon, 24)}
              </div>
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">{r.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{roleDescriptions[r.id]}</p>

          </button>
        ))}
      </div>
    </div>
  );
}

function cloneIcon(icon: ReactNode, size: number): ReactNode {
  // The icons from roleConfigs are lucide-react elements with size={18};
  // we re-render with a larger size for the cover page.
  // We use a type assertion to access the type prop for cloning.
  const iconEl = icon as React.ReactElement<{ size?: number }>;
  if (iconEl.props && typeof iconEl.props.size === 'number') {
    const { type, props } = iconEl;
    const Comp = type as React.ComponentType<{ size?: number } & Record<string, unknown>>;
    return <Comp {...props} size={size} />;
  }
  return icon;
}
