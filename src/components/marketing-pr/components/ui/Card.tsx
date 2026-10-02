import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-card rounded-xl border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  icon,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between px-5 py-4 border-b border-border">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-muted-foreground">{icon}</div>}
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );
}

export function CardBody({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function StatCard({
  label,
  value,
  icon,
  change,
  trend,
  accent = 'blue',
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  accent?: 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'indigo';
}) {
  const accentClasses: Record<string, string> = {
    blue: 'bg-primary/10 text-primary',
    green: 'bg-success/10 text-success',
    amber: 'bg-warning/10 text-warning',
    red: 'bg-destructive/10 text-destructive',
    slate: 'bg-muted text-muted-foreground',
    indigo: 'bg-chart-1/10 text-chart-1',
  };

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <p className="text-xl font-bold text-foreground flex-shrink-0">{value}</p>
            <p className="text-sm text-muted-foreground truncate">{label}</p>
          </div>
        </div>
        {change !== undefined && trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {trend === 'up' && <TrendingUp size={14} />}
            {trend === 'down' && <TrendingDown size={14} />}
            {trend === 'stable' && <Minus size={14} />}
            {change > 0 ? `+${change}%` : `${change}%`}
          </div>
        )}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accentClasses[accent]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
