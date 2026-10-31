import React from 'react';

interface ReadinessGaugeProps {
  score: number; // 0 to 100
  size?: number;
  label?: string;
  statusLabel?: string;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({
  score,
  size = 180,
  label = "Job Readiness",
  statusLabel
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return '#10B981'; // Emerald
    if (s >= 65) return '#168C8C'; // Accent Teal
    if (s >= 50) return '#F59E0B'; // Amber
    return '#EF4444'; // Rose
  };

  const getStatusText = (s: number) => {
    if (statusLabel) return statusLabel;
    if (s >= 80) return 'Placement Ready (Top 10%)';
    if (s >= 65) return 'Strong Competency';
    if (s >= 50) return 'Progressing Student';
    return 'Foundation Stage';
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#142D4E] tracking-tight">
            {score}%
          </span>
          <span className="text-[11px] font-medium text-[#718096] uppercase tracking-wider mt-0.5">
            {label}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: `${color}15`,
            color: color
          }}
        >
          {getStatusText(score)}
        </span>
      </div>
    </div>
  );
};
