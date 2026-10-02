import type { ReactNode } from 'react';

export function BarChart({
  data,
  height = 180,
  color = 'bg-primary/100',
}: {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  color?: string;
}) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <span className="text-xs font-medium text-muted-foreground">{d.value}</span>
          <div
            className={`w-full rounded-t-md transition-all duration-300 ${d.color || color}`}
            style={{ height: `${(d.value / maxVal) * (height - 40)}px`, minHeight: '4px' }}
          />
          <span className="text-[10px] text-muted-foreground text-center truncate w-full" title={d.label}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({
  data,
  size = 140,
  thickness = 18,
  centerLabel,
  centerValue,
}: {
  data: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string | number;
}) {
  const colorMap: Record<string, string> = {
    'bg-pink-500': '#ec4899',
    'bg-primary': '#2563eb',
    'bg-primary/90': '#1d4ed8',
    'bg-slate-700': '#334155',
    'bg-success/100': '#10b981',
    'bg-warning/100': '#f59e0b',
    'bg-chart-5/100': '#8b5cf6',
    'bg-chart-2/100': '#06b6d4',
    'bg-background0': '#64748b',
    'bg-chart-1/100': '#6366f1',
  };

  const segments = data.map((d) => ({
    ...d,
    stroke: d.color.startsWith('#') ? d.color : colorMap[d.color] || d.color,
  }));

  const total = segments.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={thickness}
          />
          {segments.map((d, i) => {
            const length = (d.value / total) * circumference;
            const segment = (
              <circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.stroke}
                strokeWidth={thickness}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += length;
            return segment;
          })}
        </svg>
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && <span className="text-lg font-bold text-foreground">{centerValue}</span>}
            {centerLabel && <span className="text-[10px] text-muted-foreground">{centerLabel}</span>}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="text-muted-foreground font-medium ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = 'bg-primary/100',
  label,
  showValue = true,
}: {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showValue?: boolean;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          {showValue && <span className="text-xs font-medium text-muted-foreground">{pct.toFixed(0)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Pipeline({
  steps,
}: {
  steps: { label: string; count: number; color: string }[];
}) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-1 flex-shrink-0">
          <div className="flex flex-col items-center gap-1 min-w-[100px]">
            <div className={`w-full h-16 rounded-lg ${step.color} flex items-center justify-center`}>
              <span className="text-xl font-bold text-white">{step.count}</span>
            </div>
            <span className="text-[11px] text-muted-foreground text-center font-medium">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-border flex-shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
