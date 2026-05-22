'use client';

import React, { useState } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';

interface ChartDataPoint {
  label: string;
  value: number;
}

const MONTHLY_DATA: ChartDataPoint[] = [
  { label: 'Jan', value: 85000 },
  { label: 'Feb', value: 110000 },
  { label: 'Mar', value: 95000 },
  { label: 'Apr', value: 135000 },
  { label: 'May', value: 165000 },
  { label: 'Jun', value: 148000 },
  { label: 'Jul', value: 185000 },
  { label: 'Aug', value: 195000 },
  { label: 'Sep', value: 210000 },
  { label: 'Oct', value: 245800 },
];

const WEEKLY_DATA: ChartDataPoint[] = [
  { label: 'Week 1', value: 52000 },
  { label: 'Week 2', value: 58000 },
  { label: 'Week 3', value: 65000 },
  { label: 'Week 4', value: 70800 },
];

export function RevenueOverviewChart() {
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const data = viewMode === 'monthly' ? MONTHLY_DATA : WEEKLY_DATA;
  
  // Dimensions for coordinate mapping
  const viewBoxWidth = 600;
  const viewBoxHeight = 240;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = viewBoxWidth - paddingLeft - paddingRight;
  const chartHeight = viewBoxHeight - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 10000) * 1.15; // 15% head room
  const minVal = 0;

  // Map data points to SVG coordinates
  const points = data.map((d, i) => {
    const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
    const y = viewBoxHeight - paddingBottom - ((d.value - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // SVG Path Strings
  const linePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${viewBoxHeight - paddingBottom} L ${points[0].x} ${viewBoxHeight - paddingBottom} Z` 
    : '';

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    
    // Convert clientX to viewBox coordinate
    const scaleX = viewBoxWidth / rect.width;
    const svgX = clientX * scaleX;

    // Find nearest point
    let nearestIndex = 0;
    let minDistance = Infinity;

    points.forEach((p, idx) => {
      const dist = Math.abs(p.x - svgX);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = idx;
      }
    });

    setHoveredIndex(nearestIndex);

    // Calculate tooltip absolute position inside the container
    const hoveredPoint = points[nearestIndex];
    const clientY = ((hoveredPoint.y) / viewBoxHeight) * rect.height;
    const computedTooltipX = ((hoveredPoint.x) / viewBoxWidth) * rect.width;

    setTooltipPos({
      x: computedTooltipX,
      y: clientY - 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Grid line levels
  const gridLevels = 4;
  const gridLineValues = Array.from({ length: gridLevels }, (_, i) => {
    return minVal + ((gridLevels - 1 - i) / (gridLevels - 1)) * (maxVal - minVal);
  });

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <TrendingUp size={16} />
          </div>
          <div>
            <div className="text-xs text-gray-500">Current Period</div>
            <div className="text-sm font-semibold text-white">
              LKR {data[data.length - 1].value.toLocaleString()}
            </div>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex bg-[#0f0f1a] border border-[#2d2d4e] rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'monthly'
                ? 'bg-[#6366f1] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={12} />
            Monthly
          </button>
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              viewMode === 'weekly'
                ? 'bg-[#6366f1] text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={12} />
            Weekly
          </button>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative flex-1 w-full min-h-[200px]">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full select-none overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradients */}
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLineValues.map((val, idx) => {
            const y = paddingTop + (idx / (gridLevels - 1)) * chartHeight;
            return (
              <g key={idx} className="opacity-40">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={viewBoxWidth - paddingRight}
                  y2={y}
                  stroke="#2d2d4e"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94a3b8"
                  className="text-[10px] font-medium"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Chart Paths */}
          {points.length > 0 && (
            <>
              {/* Glow Area Under Line */}
              <path d={areaPath} fill="url(#areaGrad)" className="transition-all duration-300" />

              {/* Area Border Line */}
              <path
                d={linePath}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            </>
          )}

          {/* Axis Labels (X) */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={viewBoxHeight - paddingBottom + 18}
              textAnchor="middle"
              fill="#64748b"
              className="text-[10px] font-semibold"
            >
              {p.label}
            </text>
          ))}

          {/* Hover highlight line */}
          {hoveredIndex !== null && (
            <line
              x1={points[hoveredIndex].x}
              y1={paddingTop}
              x2={points[hoveredIndex].x}
              y2={viewBoxHeight - paddingBottom}
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              strokeDasharray="2 2"
            />
          )}

          {/* Data point circle markers */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g key={idx}>
                {/* Outer ring on hover */}
                {isHovered && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="#6366f1"
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}
                {/* Core point */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? "5.5" : "3.5"}
                  fill={isHovered ? "#a78bfa" : "#6366f1"}
                  stroke="#1a1a2e"
                  strokeWidth={isHovered ? "2" : "1.5"}
                  className="transition-all duration-200 cursor-pointer"
                />
              </g>
            );
          })}
        </svg>

        {/* Dynamic HTML Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute pointer-events-none z-10 bg-[#0f0f1a]/95 border border-[#6366f1]/40 rounded-lg p-2.5 shadow-2xl transition-all duration-150 backdrop-blur-md"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="text-[10px] text-gray-400 font-medium">
              {points[hoveredIndex].label} Revenue
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              LKR {points[hoveredIndex].value.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
