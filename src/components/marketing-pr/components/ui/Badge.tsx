import type { ReactNode } from 'react';

type BadgeVariant =
  | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  | 'purple' | 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'indigo';

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/10 text-warning ring-warning/20',
  error: 'bg-destructive/10 text-destructive ring-destructive/20',
  info: 'bg-primary/10 text-primary ring-primary/20',
  neutral: 'bg-muted text-muted-foreground ring-border',
  purple: 'bg-chart-5/10 text-chart-5 ring-chart-5/20',
  blue: 'bg-primary/10 text-primary ring-primary/20',
  green: 'bg-success/10 text-success ring-success/20',
  amber: 'bg-warning/10 text-warning ring-warning/20',
  red: 'bg-destructive/10 text-destructive ring-destructive/20',
  slate: 'bg-muted text-muted-foreground ring-border',
  indigo: 'bg-chart-1/10 text-chart-1 ring-chart-1/20',
};

export function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function statusToVariant(status: string): BadgeVariant {
  const s = status.toLowerCase();
  if (['completed', 'approved', 'published', 'active', 'admitted', 'responded', 'closed', 'strong', 'positive'].includes(s)) return 'green';
  if (['in progress', 'in review', 'under review', 'scheduled', 'contacted', 'interested', 'applied', 'confirmed', 'assigned', 'pending review', 'planning'].includes(s)) return 'blue';
  if (['pending', 'due', 'on hold', 'proposed', 'follow-up', 'new lead', 'draft', 'open', 'stable'].includes(s)) return 'amber';
  if (['overdue', 'needs attention', 'cancelled', 'rejected', 'negative', 'on hold'].includes(s)) return 'red';
  if (['neutral'].includes(s)) return 'slate';
  return 'slate';
}
