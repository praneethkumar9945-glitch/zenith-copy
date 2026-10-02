import { useState } from 'react';
import { Card, CardHeader, CardBody, StatCard } from '@/components/marketing-pr/components/ui/Card';
import { Badge, statusToVariant } from '@/components/marketing-pr/components/ui/Badge';
import { Table, type Column } from '@/components/marketing-pr/components/ui/Table';
import { Drawer, Modal } from '@/components/marketing-pr/components/ui/Drawer';
import { PageHeader, SearchInput, FilterDropdown, Button, InfoRow, SectionTitle, EmptyState } from '@/components/marketing-pr/components/ui/Common';
import {
  contentItems, marketingMaterials, socialMediaContents,
  contentReviewItems as initialReviewItems, libraryAssets,
} from '@/components/marketing-pr/data/mockData';
import type { ContentItem, MarketingMaterial, SocialMediaContent, ContentReviewItem, LibraryAsset, ContentStatus } from '@/components/marketing-pr/types';
import {
  FileText, FolderOpen, Megaphone, CheckCircle2, Clock,
  AlertCircle, XCircle, Eye, Search, Image, Video, FileType,
  Palette, Download, ThumbsUp, ThumbsDown, X,
} from 'lucide-react';

// ============ CONTENT CREATION ============
export function ContentCreation() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const types = [...new Set(contentItems.map((c) => c.type))];
  const filtered = contentItems.filter((c) => {
    const ms = c.title.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || c.status === statusFilter;
    const mt = typeFilter === 'all' || c.type === typeFilter;
    return ms && mf && mt;
  });

  const columns: Column<ContentItem>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-foreground">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => <Badge variant="blue">{r.type}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusToVariant(r.status)}>{r.status}</Badge> },
    { key: 'createdBy', header: 'Created By', render: (r) => <span className="text-muted-foreground text-xs">{r.createdBy}</span> },
    { key: 'date', header: 'Date', render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
  ];

  return (
    <div>
      <PageHeader title="Content Creation" description="Manage promotional and informational content such as social media posts, website content, newsletters, and campaign materials." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Total Items" value={contentItems.length} icon={<FileText size={20} />} accent="blue" />
        <StatCard label="Published" value={contentItems.filter((c) => c.status === 'Published').length} icon={<CheckCircle2 size={20} />} accent="green" />
        <StatCard label="In Review" value={contentItems.filter((c) => c.status === 'In Review').length} icon={<Clock size={20} />} accent="amber" />
        <StatCard label="Drafts" value={contentItems.filter((c) => c.status === 'Draft').length} icon={<FileText size={20} />} accent="slate" />
      </div>
      <Card>
        <CardHeader title="Content Items" subtitle="All created content with status tracking" icon={<FileText size={18} />} />
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]"><SearchInput value={search} onChange={setSearch} placeholder="Search content..." /></div>
          <FilterDropdown label="Status" value={statusFilter} options={['Draft', 'In Review', 'Approved', 'Published']} onChange={setStatusFilter} />
          <FilterDropdown label="Type" value={typeFilter} options={types} onChange={setTypeFilter} />
        </div>
        <Table columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No content found" />
      </Card>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Content Details" subtitle={selected?.title} footer={<Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>}>
        {selected && (
          <div className="space-y-1">
            <Badge variant={statusToVariant(selected.status)}>{selected.status}</Badge>
            <InfoRow label="Title" value={selected.title} />
            <InfoRow label="Type" value={selected.type} />
            <InfoRow label="Created By" value={selected.createdBy} />
            <InfoRow label="Date" value={selected.date} />
            <div className="pt-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Content</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.content}</p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ============ MARKETING MATERIALS ============
export function MarketingMaterials() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selected, setSelected] = useState<MarketingMaterial | null>(null);

  const types = [...new Set(marketingMaterials.map((m) => m.type))];
  const filtered = marketingMaterials.filter((m) => {
    const ms = m.title.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || m.status === statusFilter;
    const mt = typeFilter === 'all' || m.type === typeFilter;
    return ms && mf && mt;
  });

  const columns: Column<MarketingMaterial>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-foreground">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => <Badge variant="blue">{r.type}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusToVariant(r.status)}>{r.status}</Badge> },
    { key: 'date', header: 'Date', render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
    { key: 'size', header: 'File Size', render: (r) => <span className="text-muted-foreground text-xs">{r.fileSize}</span> },
  ];

  return (
    <div>
      <PageHeader title="Marketing Materials" description="Create and manage brochures, prospectuses, posters, flyers, presentations, and other promotional materials." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Total Materials" value={marketingMaterials.length} icon={<FileText size={20} />} accent="blue" />
        <StatCard label="Published" value={marketingMaterials.filter((m) => m.status === 'Published').length} icon={<CheckCircle2 size={20} />} accent="green" />
        <StatCard label="In Review" value={marketingMaterials.filter((m) => m.status === 'In Review').length} icon={<Clock size={20} />} accent="amber" />
        <StatCard label="Drafts" value={marketingMaterials.filter((m) => m.status === 'Draft').length} icon={<FileText size={20} />} accent="slate" />
      </div>
      <Card>
        <CardHeader title="Marketing Materials" subtitle="All promotional materials and documents" icon={<FileText size={18} />} />
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]"><SearchInput value={search} onChange={setSearch} placeholder="Search materials..." /></div>
          <FilterDropdown label="Status" value={statusFilter} options={['Draft', 'In Review', 'Approved', 'Published']} onChange={setStatusFilter} />
          <FilterDropdown label="Type" value={typeFilter} options={types} onChange={setTypeFilter} />
        </div>
        <Table columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No materials found" />
      </Card>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Material Details" subtitle={selected?.title} footer={<Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>}>
        {selected && (
          <div className="space-y-1">
            <Badge variant={statusToVariant(selected.status)}>{selected.status}</Badge>
            <InfoRow label="Title" value={selected.title} />
            <InfoRow label="Type" value={selected.type} />
            <InfoRow label="Date" value={selected.date} />
            <InfoRow label="Created By" value={selected.createdBy} />
            <InfoRow label="File Size" value={selected.fileSize} />
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ============ SOCIAL MEDIA CONTENT ============
export function SocialMediaContentPage() {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<SocialMediaContent | null>(null);

  const platforms = [...new Set(socialMediaContents.map((s) => s.platform))];
  const filtered = socialMediaContents.filter((s) => {
    const ms = s.title.toLowerCase().includes(search.toLowerCase());
    const mp = platformFilter === 'all' || s.platform === platformFilter;
    const mf = statusFilter === 'all' || s.status === statusFilter;
    return ms && mp && mf;
  });

  const columns: Column<SocialMediaContent>[] = [
    { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-foreground">{r.title}</span> },
    { key: 'platform', header: 'Platform', render: (r) => <Badge variant="blue">{r.platform}</Badge> },
    { key: 'topic', header: 'Topic', render: (r) => <Badge variant="slate">{r.topic}</Badge> },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusToVariant(r.status)}>{r.status}</Badge> },
    { key: 'date', header: 'Date', render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
  ];

  return (
    <div>
      <PageHeader title="Social Media Content" description="Prepare and manage content for the institution's social media channels to communicate programs, achievements, events, and updates." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Total Posts" value={socialMediaContents.length} icon={<Megaphone size={20} />} accent="blue" />
        <StatCard label="Published" value={socialMediaContents.filter((s) => s.status === 'Published').length} icon={<CheckCircle2 size={20} />} accent="green" />
        <StatCard label="In Review" value={socialMediaContents.filter((s) => s.status === 'In Review').length} icon={<Clock size={20} />} accent="amber" />
        <StatCard label="Drafts" value={socialMediaContents.filter((s) => s.status === 'Draft').length} icon={<FileText size={20} />} accent="slate" />
      </div>
      <Card>
        <CardHeader title="Social Media Content" subtitle="All social media content with platform and topic" icon={<Megaphone size={18} />} />
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]"><SearchInput value={search} onChange={setSearch} placeholder="Search content..." /></div>
          <FilterDropdown label="Platform" value={platformFilter} options={platforms} onChange={setPlatformFilter} />
          <FilterDropdown label="Status" value={statusFilter} options={['Draft', 'In Review', 'Approved', 'Published']} onChange={setStatusFilter} />
        </div>
        <Table columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No content found" />
      </Card>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Content Details" subtitle={selected?.title} footer={<Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>}>
        {selected && (
          <div className="space-y-1">
            <Badge variant={statusToVariant(selected.status)}>{selected.status}</Badge>
            <InfoRow label="Title" value={selected.title} />
            <InfoRow label="Platform" value={selected.platform} />
            <InfoRow label="Topic" value={selected.topic} />
            <InfoRow label="Date" value={selected.date} />
            <InfoRow label="Created By" value={selected.createdBy} />
          </div>
        )}
      </Drawer>
    </div>
  );
}

// ============ CONTENT REVIEW & APPROVAL ============
export function ContentReviewApproval() {
  const [items, setItems] = useState(initialReviewItems);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<ContentReviewItem | null>(null);
  const [actionModal, setActionModal] = useState<{ item: ContentReviewItem; action: 'approve' | 'changes' | 'reject' } | null>(null);

  const filtered = items.filter((c) => {
    const ms = c.title.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || c.status === statusFilter;
    return ms && mf;
  });

  const handleAction = () => {
    if (!actionModal) return;
    const newStatus = actionModal.action === 'approve' ? 'Approved' : actionModal.action === 'changes' ? 'Changes Requested' : 'Rejected';
    setItems((prev) => prev.map((c) => c.id === actionModal.item.id ? { ...c, status: newStatus as ContentReviewItem['status'] } : c));
    setActionModal(null);
  };

  const columns: Column<ContentReviewItem>[] = [
    { key: 'title', header: 'Content', render: (r) => <span className="font-medium text-foreground">{r.title}</span> },
    { key: 'type', header: 'Type', render: (r) => <Badge variant="blue">{r.type}</Badge> },
    { key: 'createdBy', header: 'Created By', render: (r) => <span className="text-muted-foreground text-xs">{r.createdBy}</span> },
    { key: 'date', header: 'Date', render: (r) => <span className="text-muted-foreground text-xs">{r.date}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusToVariant(r.status)}>{r.status}</Badge> },
    { key: 'reviewer', header: 'Reviewer', render: (r) => <span className="text-muted-foreground text-xs">{r.reviewer}</span> },
    { key: 'action', header: 'Action', render: (r) => (
      r.status === 'Pending Review' ? (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setActionModal({ item: r, action: 'approve' })} className="text-xs text-success hover:underline font-medium">Approve</button>
          <button onClick={() => setActionModal({ item: r, action: 'changes' })} className="text-xs text-warning hover:underline font-medium">Changes</button>
          <button onClick={() => setActionModal({ item: r, action: 'reject' })} className="text-xs text-destructive hover:underline font-medium">Reject</button>
        </div>
      ) : <span className="text-xs text-muted-foreground">Reviewed</span>
    )},
  ];

  return (
    <div>
      <PageHeader title="Content Review & Approval" description="Review content for accuracy, quality, consistency, and alignment with the institution's brand before publication." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Pending Review" value={items.filter((c) => c.status === 'Pending Review').length} icon={<Clock size={20} />} accent="amber" />
        <StatCard label="Approved" value={items.filter((c) => c.status === 'Approved').length} icon={<CheckCircle2 size={20} />} accent="green" />
        <StatCard label="Changes Requested" value={items.filter((c) => c.status === 'Changes Requested').length} icon={<AlertCircle size={20} />} accent="amber" />
        <StatCard label="Rejected" value={items.filter((c) => c.status === 'Rejected').length} icon={<XCircle size={20} />} accent="red" />
      </div>
      <Card>
        <CardHeader title="Review Queue" subtitle="Content items awaiting review and approval" icon={<FileText size={18} />} />
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="flex-1"><SearchInput value={search} onChange={setSearch} placeholder="Search content..." /></div>
          <FilterDropdown label="Status" value={statusFilter} options={['Pending Review', 'Approved', 'Changes Requested', 'Rejected']} onChange={setStatusFilter} />
        </div>
        <Table columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No items found" />
      </Card>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Content Review Details" subtitle={selected?.title} footer={<Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>}>
        {selected && (
          <div className="space-y-1">
            <Badge variant={statusToVariant(selected.status)}>{selected.status}</Badge>
            <InfoRow label="Title" value={selected.title} />
            <InfoRow label="Type" value={selected.type} />
            <InfoRow label="Created By" value={selected.createdBy} />
            <InfoRow label="Date" value={selected.date} />
            <InfoRow label="Reviewer" value={selected.reviewer} />
            <div className="pt-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Content</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.content}</p>
            </div>
          </div>
        )}
      </Drawer>
      <Modal
        open={!!actionModal}
        onClose={() => setActionModal(null)}
        title={
          actionModal?.action === 'approve' ? 'Approve Content' :
          actionModal?.action === 'changes' ? 'Request Changes' : 'Reject Content'
        }
        subtitle={actionModal?.item.title}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setActionModal(null)}>Cancel</Button>
            <Button
              variant={actionModal?.action === 'approve' ? 'success' : actionModal?.action === 'reject' ? 'danger' : 'primary'}
              icon={actionModal?.action === 'approve' ? <ThumbsUp size={16} /> : actionModal?.action === 'reject' ? <ThumbsDown size={16} /> : <AlertCircle size={16} />}
              onClick={handleAction}
            >
              {actionModal?.action === 'approve' ? 'Approve' : actionModal?.action === 'changes' ? 'Request Changes' : 'Reject'}
            </Button>
          </div>
        }
      >
        {actionModal && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {actionModal.action === 'approve' && 'Are you sure you want to approve this content? It will be marked as approved and ready for publication.'}
              {actionModal.action === 'changes' && 'Are you sure you want to request changes for this content? The content team will be notified.'}
              {actionModal.action === 'reject' && 'Are you sure you want to reject this content? This action cannot be undone.'}
            </p>
            <div className="p-3 bg-background rounded-lg border border-border">
              <InfoRow label="Content" value={actionModal.item.title} />
              <InfoRow label="Type" value={actionModal.item.type} />
              <InfoRow label="Created By" value={actionModal.item.createdBy} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

// ============ CONTENT LIBRARY ============
export function ContentLibrary() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selected, setSelected] = useState<LibraryAsset | null>(null);

  const types = [...new Set(libraryAssets.map((a) => a.type))];
  const categories = [...new Set(libraryAssets.map((a) => a.category))];
  const filtered = libraryAssets.filter((a) => {
    const ms = a.name.toLowerCase().includes(search.toLowerCase());
    const mt = typeFilter === 'all' || a.type === typeFilter;
    const mc = categoryFilter === 'all' || a.category === categoryFilter;
    return ms && mt && mc;
  });

  const typeIcons: Record<string, typeof Image> = {
    Image: Image, Video: Video, Graphic: Palette, Brochure: FileText, Template: FileType,
  };

  const columns: Column<LibraryAsset>[] = [
    { key: 'name', header: 'Name', render: (r) => (
      <div className="flex items-center gap-2">
        {(() => { const Icon = typeIcons[r.type] || FileText; return <Icon size={16} className="text-muted-foreground" />; })()}
        <span className="font-medium text-foreground">{r.name}</span>
      </div>
    )},
    { key: 'type', header: 'Type', render: (r) => <Badge variant="blue">{r.type}</Badge> },
    { key: 'category', header: 'Category', render: (r) => <Badge variant="slate">{r.category}</Badge> },
    { key: 'date', header: 'Upload Date', render: (r) => <span className="text-muted-foreground text-xs">{r.uploadDate}</span> },
    { key: 'uploadedBy', header: 'Uploaded By', render: (r) => <span className="text-muted-foreground text-xs">{r.uploadedBy}</span> },
    { key: 'size', header: 'Size', render: (r) => <span className="text-muted-foreground text-xs">{r.size}</span> },
  ];

  return (
    <div>
      <PageHeader title="Content Library" description="Store and organize approved images, videos, graphics, brochures, templates, and other brand assets for team use." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        <StatCard label="Total Assets" value={libraryAssets.length} icon={<FolderOpen size={20} />} accent="blue" />
        <StatCard label="Images" value={libraryAssets.filter((a) => a.type === 'Image').length} icon={<Image size={20} />} accent="green" />
        <StatCard label="Videos" value={libraryAssets.filter((a) => a.type === 'Video').length} icon={<Video size={20} />} accent="indigo" />
        <StatCard label="Templates" value={libraryAssets.filter((a) => a.type === 'Template').length} icon={<FileType size={20} />} accent="amber" />
      </div>
      <Card>
        <CardHeader title="Asset Library" subtitle="All brand assets and materials" icon={<FolderOpen size={18} />} />
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]"><SearchInput value={search} onChange={setSearch} placeholder="Search assets..." /></div>
          <FilterDropdown label="Type" value={typeFilter} options={types} onChange={setTypeFilter} />
          <FilterDropdown label="Category" value={categoryFilter} options={categories} onChange={setCategoryFilter} />
        </div>
        <Table columns={columns} data={filtered} onRowClick={setSelected} emptyMessage="No assets found" />
      </Card>
      <Drawer open={!!selected} onClose={() => setSelected(null)} title="Asset Details" subtitle={selected?.name} footer={
        selected && <div className="flex justify-end gap-2"><Button variant="secondary" onClick={() => setSelected(null)}>Close</Button><Button variant="primary" icon={<Download size={16} />}>Download</Button></div>
      }>
        {selected && (
          <div className="space-y-1">
            <Badge variant="blue">{selected.type}</Badge>
            <Badge variant="slate">{selected.category}</Badge>
            <InfoRow label="Name" value={selected.name} />
            <InfoRow label="Type" value={selected.type} />
            <InfoRow label="Category" value={selected.category} />
            <InfoRow label="Upload Date" value={selected.uploadDate} />
            <InfoRow label="Uploaded By" value={selected.uploadedBy} />
            <InfoRow label="File Size" value={selected.size} />
          </div>
        )}
      </Drawer>
    </div>
  );
}
