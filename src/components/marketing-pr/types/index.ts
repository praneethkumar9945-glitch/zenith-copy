export type Role =
  | 'marketing-head'
  | 'sales'
  | 'digital'
  | 'content'
  | 'events';

export type LeadStatus =
  | 'New Lead'
  | 'Contacted'
  | 'Interested'
  | 'Follow-up'
  | 'Applied'
  | 'Admitted';

export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export type CampaignStatus =
  | 'Active'
  | 'Completed'
  | 'Under Review'
  | 'Scheduled'
  | 'On Hold';

export type TaskStatus = 'Assigned' | 'In Progress' | 'Under Review' | 'Completed';

export type Priority = 'High' | 'Medium' | 'Low';

export type ContentStatus = 'Draft' | 'In Review' | 'Approved' | 'Published' | 'Rejected';

export type EventStatus =
  | 'Planning'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export type FollowUpStatus = 'Due' | 'Scheduled' | 'Completed' | 'Overdue';

export type EnquiryCallStatus = 'Completed' | 'No Answer' | 'Busy';

export interface EnquiryInteraction {
  id: string;
  callDateTime: string;
  callStatus: EnquiryCallStatus;
  notes?: string;
  nextFollowUpDate?: string;
}

export type PRStatus =
  | 'Completed'
  | 'In Progress'
  | 'Pending'
  | 'Under Review'
  | 'Needs Attention';

export type WebsiteContentStatus = 'Draft' | 'Under Review' | 'Published';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  leadSource: string;
  dateReceived: string;
  status: LeadStatus;
  assignedCounsellor: string;
  interestLevel: 'High' | 'Medium' | 'Low';
  lastContact?: string;
  nextFollowUp?: string;
  notes?: string;
}

export interface Enquiry {
  id: string;
  studentName: string;
  category: 'Courses' | 'Fees' | 'Eligibility' | 'Admissions' | 'Other';
  subject: string;
  date: string;
  status: 'Open' | 'Responded' | 'Closed';
  assignedCounsellor: string;
  lastResponse?: string;
  phoneNumber?: string;
  interestedCourse?: string;
  callStatus?: EnquiryCallStatus;
  callNotes?: string;
  nextFollowUpDate?: string;
  callDateTime?: string;
  activityHistory?: EnquiryInteraction[];
}

export interface FollowUp {
  id: string;
  studentName: string;
  courseInterest: string;
  assignedCounsellor: string;
  lastContact: string;
  nextFollowUp: string;
  status: FollowUpStatus;
  notes?: string;
}

export interface CounsellingRecord {
  id: string;
  studentName: string;
  course: string;
  counsellor: string;
  date: string;
  interestLevel: 'High' | 'Medium' | 'Low';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  nextStep: string;
  notes?: string;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  targetAudience: string;
  startDate: string;
  endDate: string;
  channel: string;
  status: CampaignStatus;
  performance: number;
  reach: number;
  engagement: number;
  leadsGenerated: number;
  reviewed: boolean;
  feedback?: string;
}

export interface BrandActivity {
  id: string;
  activity: string;
  source: string;
  date: string;
  sentiment: Sentiment;
  status: string;
  details: string;
}

export interface PRActivity {
  id: string;
  activity: string;
  type: string;
  date: string;
  status: PRStatus;
  assignedTo: string;
  details: string;
}

export interface DigitalCampaign {
  id: string;
  name: string;
  channel: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
  reach: number;
  engagement: number;
  leadsGenerated: number;
}

export interface WebsiteContent {
  id: string;
  title: string;
  type: 'Courses' | 'Admissions' | 'Events' | 'Announcements';
  status: WebsiteContentStatus;
  lastUpdated: string;
  url: string;
  views: number;
}

export interface SocialPost {
  id: string;
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'Twitter';
  content: string;
  date: string;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
}

export interface SEOKeyword {
  id: string;
  keyword: string;
  rank: number;
  previousRank: number;
  searchVolume: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'Social Media Post' | 'Website Content' | 'Newsletter' | 'Campaign Material';
  status: ContentStatus;
  createdBy: string;
  date: string;
  reviewer?: string;
  content: string;
}

export interface MarketingMaterial {
  id: string;
  title: string;
  type: 'Brochure' | 'Prospectus' | 'Poster' | 'Flyer' | 'Presentation';
  status: ContentStatus;
  date: string;
  createdBy: string;
  fileSize: string;
}

export interface SocialMediaContent {
  id: string;
  title: string;
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'Twitter';
  topic: 'Programs' | 'Achievements' | 'Events' | 'Institutional Updates';
  status: ContentStatus;
  date: string;
  createdBy: string;
}

export interface ContentReviewItem {
  id: string;
  title: string;
  type: string;
  createdBy: string;
  date: string;
  status: 'Pending Review' | 'Approved' | 'Changes Requested' | 'Rejected';
  reviewer: string;
  content: string;
}

export interface LibraryAsset {
  id: string;
  name: string;
  type: 'Image' | 'Video' | 'Graphic' | 'Brochure' | 'Template';
  category: string;
  uploadDate: string;
  uploadedBy: string;
  size: string;
}

export interface EventItem {
  id: string;
  name: string;
  type: 'Education Fair' | 'Seminar' | 'Open Day' | 'Workshop';
  date: string;
  location: string;
  coordinator: string;
  participants: number;
  status: EventStatus;
  leadsGenerated: number;
  description: string;
}

export interface SchoolOutreach {
  id: string;
  institution: string;
  activity: string;
  date: string;
  contactPerson: string;
  contactPhone: string;
  status: 'Scheduled' | 'Completed' | 'Pending' | 'Cancelled';
  leadsGenerated: number;
}

export interface Partnership {
  id: string;
  organization: string;
  type: 'School' | 'College' | 'Community Group' | 'External Organization';
  contactPerson: string;
  email: string;
  phone: string;
  status: 'Active' | 'Proposed' | 'On Hold' | 'Ended';
  collaboration: string;
  date: string;
}

export interface OutreachLead {
  id: string;
  studentName: string;
  source: string;
  courseInterest: string;
  date: string;
  status: LeadStatus;
  followUpAssigned: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTeam: 'Digital Marketing Executive' | 'Content / Brand Team' | 'Events & Outreach Coordinator' | 'PR / Media Team';
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
  createdBy: string;
  createdAt: string;
  progressNotes?: string[];
}

export interface Notification {
  id: string;
  type: 'task' | 'content' | 'media' | 'campaign' | 'follow-up' | 'lead' | 'event' | 'pr';
  title: string;
  message: string;
  time: string;
  read: boolean;
  role: Role | 'all';
}

export interface DigitalKPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
}
