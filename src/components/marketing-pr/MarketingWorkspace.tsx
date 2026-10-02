import { useMemo, useState, type ComponentType } from "react";
import {
  BarChart3,
  CalendarCheck,
  CalendarDays,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  Handshake,
  Megaphone,
  Palette,
  Phone,
  Search,
  Shield,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandingReputation } from "./pages/marketing/BrandingReputation";
import { CampaignManagement } from "./pages/marketing/CampaignManagement";
import { DigitalMarketingOverview } from "./pages/marketing/DigitalMarketingOverview";
import { PRMediaManagement } from "./pages/marketing/PRMediaManagement";
import { TeamCoordination } from "./pages/marketing/TeamCoordination";
import {
  Counselling,
  ConversionTracking,
  EnquiryManagement,
  FollowUps,
  LeadManagement,
  SalesReports,
} from "./pages/sales/SalesPages";
import {
  DigitalAnalytics,
  DigitalCampaignManagement,
  LeadGeneration,
  SEOManagement,
  SocialMediaManagement,
  WebsiteManagement,
} from "./pages/digital/DigitalPages";
import {
  ContentCreation,
  ContentLibrary,
  ContentReviewApproval,
  MarketingMaterials,
  SocialMediaContentPage,
} from "./pages/content/ContentPages";
import {
  EventManagement,
  EventPerformanceReports,
  OutreachLeadGeneration,
  PartnershipCoordination,
  SchoolOutreachPage,
} from "./pages/events/EventsPages";

type Role = "marketing-head" | "sales" | "digital" | "content" | "events";
type Screen = { id: string; label: string; icon: ComponentType<{ className?: string }>; view: ComponentType };
type Workspace = { id: Role; label: string; shortLabel: string; icon: ComponentType<{ className?: string }>; screens: Screen[] };

const WORKSPACES: Workspace[] = [
  {
    id: "marketing-head", label: "Marketing Head / PRO", shortLabel: "Marketing", icon: Shield,
    screens: [
      { id: "branding", label: "Branding & Reputation", icon: Shield, view: BrandingReputation },
      { id: "pr-media", label: "PR & Media", icon: Megaphone, view: PRMediaManagement },
      { id: "campaigns", label: "Campaign Management", icon: Target, view: CampaignManagement },
      { id: "digital-overview", label: "Digital Overview", icon: Globe, view: DigitalMarketingOverview },
      { id: "team-coordination", label: "Team Coordination", icon: Users, view: TeamCoordination },
    ],
  },
  {
    id: "sales", label: "Sales Team", shortLabel: "Sales", icon: Phone,
    screens: [
      { id: "leads", label: "Lead Management", icon: UserPlus, view: LeadManagement },
      { id: "enquiries", label: "Enquiry Management", icon: Phone, view: EnquiryManagement },
      { id: "followups", label: "Follow-ups", icon: CalendarCheck, view: FollowUps },
      { id: "counselling", label: "Counselling", icon: GraduationCap, view: Counselling },
      { id: "conversion", label: "Conversion Tracking", icon: Target, view: ConversionTracking },
      { id: "reports", label: "Reports", icon: BarChart3, view: SalesReports },
    ],
  },
  {
    id: "digital", label: "Digital Marketing Executive", shortLabel: "Digital", icon: Globe,
    screens: [
      { id: "digital-campaigns", label: "Digital Campaigns", icon: Target, view: DigitalCampaignManagement },
      { id: "website", label: "Website Management", icon: Globe, view: WebsiteManagement },
      { id: "social-media", label: "Social Media", icon: Megaphone, view: SocialMediaManagement },
      { id: "seo", label: "SEO Management", icon: Search, view: SEOManagement },
      { id: "analytics", label: "Analytics & Reports", icon: TrendingUp, view: DigitalAnalytics },
      { id: "lead-gen", label: "Lead Generation", icon: UserPlus, view: LeadGeneration },
    ],
  },
  {
    id: "content", label: "Content / Brand Team", shortLabel: "Content", icon: Palette,
    screens: [
      { id: "content-creation", label: "Content Creation", icon: FileText, view: ContentCreation },
      { id: "materials", label: "Marketing Materials", icon: FileText, view: MarketingMaterials },
      { id: "social-content", label: "Social Content", icon: Megaphone, view: SocialMediaContentPage },
      { id: "review", label: "Review & Approval", icon: CalendarCheck, view: ContentReviewApproval },
      { id: "library", label: "Content Library", icon: FolderOpen, view: ContentLibrary },
    ],
  },
  {
    id: "events", label: "Events & Outreach Coordinator", shortLabel: "Events", icon: CalendarDays,
    screens: [
      { id: "events", label: "Event Management", icon: CalendarDays, view: EventManagement },
      { id: "school-outreach", label: "School Outreach", icon: GraduationCap, view: SchoolOutreachPage },
      { id: "partnerships", label: "Partnerships", icon: Handshake, view: PartnershipCoordination },
      { id: "outreach-leads", label: "Outreach Leads", icon: UserPlus, view: OutreachLeadGeneration },
      { id: "event-reports", label: "Performance Reports", icon: BarChart3, view: EventPerformanceReports },
    ],
  },
];

export function MarketingWorkspace() {
  const [role, setRole] = useState<Role>("marketing-head");
  const workspace = useMemo(() => WORKSPACES.find((item) => item.id === role) ?? WORKSPACES[0], [role]);
  const [screenByRole, setScreenByRole] = useState<Record<Role, string>>({
    "marketing-head": "branding", sales: "leads", digital: "digital-campaigns", content: "content-creation", events: "events",
  });
  const currentScreen = workspace.screens.find((item) => item.id === screenByRole[role]) ?? workspace.screens[0];
  const CurrentView = currentScreen.view;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground"><Megaphone className="size-5" /></div>
          <div><h1 className="text-lg font-semibold">Marketing, Admissions & PR</h1><p className="text-xs text-muted-foreground">Campaigns, admissions, content and outreach</p></div>
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="marketing-role">Switch role</label>
          <select id="marketing-role" value={role} onChange={(event) => setRole(event.target.value as Role)} className="h-9 max-w-64 rounded-md border border-input bg-background px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-ring">
            {WORKSPACES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-13rem)] md:grid-cols-[224px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-card p-3 md:border-b-0 md:border-r">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase text-muted-foreground">{workspace.shortLabel} workspace</p>
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {workspace.screens.map(({ id, label, icon: Icon }) => (
              <Button key={id} type="button" variant={currentScreen.id === id ? "default" : "ghost"} onClick={() => setScreenByRole((current) => ({ ...current, [role]: id }))} className="h-10 shrink-0 justify-start px-3 md:w-full">
                <Icon className="size-4" /><span>{label}</span>
              </Button>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 p-4 sm:p-6"><CurrentView /></main>
      </div>
    </div>
  );
}