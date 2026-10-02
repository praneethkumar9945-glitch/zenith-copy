import { Card, CardHeader, CardBody, StatCard } from '@/components/marketing-pr/components/ui/Card';
import { Badge, statusToVariant } from '@/components/marketing-pr/components/ui/Badge';
import { BarChart, DonutChart, ProgressBar, Pipeline } from '@/components/marketing-pr/components/charts/Charts';
import { PageHeader, SectionTitle } from '@/components/marketing-pr/components/ui/Common';
import {
  Shield, Megaphone, TrendingUp, Globe, Users, Target,
  Newspaper, AlertCircle, CheckCircle2, Eye, MousePointerClick,
  Search, Share2, BarChart3, Activity,
} from 'lucide-react';
import type { ReactNode } from 'react';

export function MarketingOverview({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div>
      <PageHeader
        title="Overview"
        description="Monitor and coordinate the institution's marketing, branding, public relations, and digital marketing activities."
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Brand Status" value="Strong" icon={<Shield size={20} />} accent="green" />
        <StatCard label="Active Campaigns" value={3} icon={<Target size={20} />} accent="blue" />
        <StatCard label="Positive Mentions" value="340+" icon={<TrendingUp size={20} />} accent="green" change={12.5} trend="up" />
        <StatCard label="Items Needing Attention" value={4} icon={<AlertCircle size={20} />} accent="amber" />
      </div>

      {/* Brand Image & Public Perception */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Brand Image Overview" subtitle="Public perception across platforms" icon={<Shield size={18} />} />
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Brand Status</p>
                <Badge variant="green">Strong</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Positive Mentions</p>
                <p className="text-lg font-bold text-foreground">340+</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Media Coverage</p>
                <p className="text-lg font-bold text-foreground">12</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Reputation Issues</p>
                <p className="text-lg font-bold text-destructive">2</p>
              </div>
            </div>
            <div className="mt-4">
              <SectionTitle title="Sentiment Distribution (Last 30 days)">
                <button onClick={() => onNavigate('branding')} className="text-xs text-primary hover:underline font-medium">View Details</button>
              </SectionTitle>
              <DonutChart
                size={120}
                data={[
                  { label: 'Positive', value: 340, color: 'bg-success/100' },
                  { label: 'Neutral', value: 85, color: 'bg-slate-300' },
                  { label: 'Negative', value: 12, color: 'bg-destructive/80' },
                ]}
                centerValue="437"
                centerLabel="Total"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Reputation Monitoring" icon={<AlertCircle size={18} />} />
          <CardBody>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Negative social media comment</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Twitter - Admission delay complaint</p>
                </div>
                <Badge variant="red">Needs Attention</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Community outreach feature overdue</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Local newspaper - Response pending</p>
                </div>
                <Badge variant="amber">Pending</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div>
                  <p className="text-sm font-medium text-foreground">Ranked #7 regional engineering</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Education Portal - Published</p>
                </div>
                <Badge variant="green">Published</Badge>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Marketing Campaign Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Marketing Campaign Overview"
            subtitle="Active and completed campaigns performance"
            icon={<Target size={18} />}
            action={<button onClick={() => onNavigate('campaigns')} className="text-xs text-primary hover:underline font-medium">View All</button>}
          />
          <CardBody>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-xs text-muted-foreground mt-1">Active</p>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <p className="text-2xl font-bold text-warning">2</p>
                <p className="text-xs text-muted-foreground mt-1">Under Review</p>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">1</p>
                <p className="text-xs text-muted-foreground mt-1">Completed</p>
              </div>
            </div>
            <SectionTitle title="Campaign Performance" />
            <BarChart
              data={[
                { label: '2026 Admissions', value: 78 },
                { label: 'UG Awareness', value: 65 },
                { label: 'MBA Promo', value: 72 },
                { label: 'Open Day', value: 85 },
                { label: 'Nursing', value: 68 },
              ]}
              color="bg-primary/100"
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Recent Brand Activity" icon={<Activity size={18} />} />
          <CardBody>
            <div className="space-y-3">
              {[
                { activity: 'Student achievement coverage', source: 'City Daily', sentiment: 'Positive', time: '3 days ago' },
                { activity: 'Annual event feedback', source: 'Social Media', sentiment: 'Positive', time: '5 days ago' },
                { activity: 'Parent review on Google', source: 'Google', sentiment: 'Positive', time: '7 days ago' },
                { activity: 'Negative comment on Twitter', source: 'Twitter', sentiment: 'Negative', time: '11 days ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.sentiment === 'Positive' ? 'bg-success/100' : item.sentiment === 'Negative' ? 'bg-destructive/100' : 'bg-slate-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.source} - {item.time}</p>
                  </div>
                  <Badge variant={item.sentiment === 'Positive' ? 'green' : 'red'}>{item.sentiment}</Badge>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Digital Marketing Overview */}
      <Card className="mb-3">
        <CardHeader
          title="Digital Marketing Overview"
          subtitle="Website, social media, SEO, and advertising performance"
          icon={<Globe size={18} />}
          action={<button onClick={() => onNavigate('digital-overview')} className="text-xs text-primary hover:underline font-medium">View Details</button>}
        />
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DigitalMiniCard icon={<Eye size={18} />} label="Website Visitors" value="48,250" change="+12.5%" trend="up" color="text-primary bg-primary/10" />
            <DigitalMiniCard icon={<Share2 size={18} />} label="Social Reach" value="133.5K" change="+15.3%" trend="up" color="text-success bg-success/10" />
            <DigitalMiniCard icon={<Search size={18} />} label="Search Visibility" value="72%" change="+5.4%" trend="up" color="text-warning bg-warning/10" />
            <DigitalMiniCard icon={<MousePointerClick size={18} />} label="Ad Leads" value="477" change="-3.2%" trend="down" color="text-chart-2 bg-chart-2/10" />
          </div>
        </CardBody>
      </Card>

      {/* Team Activity Summary */}
      <Card>
        <CardHeader title="Team Activity Summary" subtitle="Activity across all teams" icon={<Users size={18} />} />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SectionTitle title="Tasks by Team" />
              <div className="space-y-3">
                <TeamActivityBar team="Digital Marketing Executive" tasks={2} color="bg-chart-2/100" />
                <TeamActivityBar team="Content / Brand Team" tasks={2} color="bg-chart-5/100" />
                <TeamActivityBar team="Events & Outreach Coordinator" tasks={1} color="bg-warning/100" />
                <TeamActivityBar team="PR / Media Team" tasks={1} color="bg-primary/100" />
              </div>
            </div>
            <div>
              <SectionTitle title="Task Status Distribution" />
              <DonutChart
                size={120}
                data={[
                  { label: 'Completed', value: 2, color: 'bg-success/100' },
                  { label: 'In Progress', value: 2, color: 'bg-primary/100' },
                  { label: 'Under Review', value: 1, color: 'bg-warning/100' },
                  { label: 'Assigned', value: 1, color: 'bg-slate-400' },
                ]}
                centerValue="6"
                centerLabel="Total"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function DigitalMiniCard({ icon, label, value, change, trend, color }: {
  icon: ReactNode; label: string; value: string; change: string; trend: 'up' | 'down'; color: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-border">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${color}`}>{icon}</div>
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      <p className={`text-xs mt-1 font-medium ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>{change}</p>
    </div>
  );
}

function TeamActivityBar({ team, tasks, color }: { team: string; tasks: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-muted-foreground">{team}</span>
        <span className="text-xs font-medium text-foreground">{tasks} tasks</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${(tasks / 2) * 100}%` }} />
      </div>
    </div>
  );
}
