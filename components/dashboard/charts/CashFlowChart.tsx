'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';

interface FlowDataPoint {
  label: string;
  moneyIn: number;
  moneyOut: number;
}

const FLOW_DATA: FlowDataPoint[] = [
  { label: 'Week 1', moneyIn: 12000, moneyOut: 3500 },
  { label: 'Week 2', moneyIn: 18000, moneyOut: 4200 },
  { label: 'Week 3', moneyIn: 15000, moneyOut: 5800 },
  { label: 'Week 4', moneyIn: 20000, moneyOut: 4900 },
];

export function CashFlowChart() {
  const [showIn, setShowIn] = useState(true);
  const [showOut, setShowOut] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Dimensions
  const viewBoxWidth = 500;
  const viewBoxHeight = 200;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 35;

  const chartWidth = viewBoxWidth - paddingLeft - paddingRight;
  const chartHeight = viewBoxHeight - paddingTop - paddingBottom;

  // Max value calculation
  const maxIn = showIn ? Math.max(...FLOW_DATA.map((d) => d.moneyIn)) : 0;
  const maxOut = showOut ? Math.max(...FLOW_DATA.map((d) => d.moneyOut)) : 0;
  const maxVal = Math.max(maxIn, maxOut, 5000) * 1.15; // 15% padding
  const minVal = 0;

  // Coordinate mapping
  const points = FLOW_DATA.map((d, i) => {
    const x = paddingLeft + (i / (FLOW_DATA.length - 1)) * chartWidth;
    const yIn = viewBoxHeight - paddingBottom - ((d.moneyIn - minVal) / (maxVal - minVal)) * chartHeight;
    const yOut = viewBoxHeight - paddingBottom - ((d.moneyOut - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, yIn, yOut, label: d.label, moneyIn: d.moneyIn, moneyOut: d.moneyOut };
  });

  // SVGs Paths - Money In
  const inLinePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.yIn}` : `${acc} L ${p.x} ${p.yIn}`;
  }, '');
  const inAreaPath = points.length > 0
    ? `${inLinePath} L ${points[points.length - 1].x} ${viewBoxHeight - paddingBottom} L ${points[0].x} ${viewBoxHeight - paddingBottom} Z`
    : '';

  // SVGs Paths - Money Out
  const outLinePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.yOut}` : `${acc} L ${p.x} ${p.yOut}`;
  }, '');
  const outAreaPath = points.length > 0
    ? `${outLinePath} L ${points[points.length - 1].x} ${viewBoxHeight - paddingBottom} L ${points[0].x} ${viewBoxHeight - paddingBottom} Z`
    : '';

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    
    // Scale factor
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

    // Compute absolute tooltips X
    const hoveredPoint = points[nearestIndex];
    const computedTooltipX = (hoveredPoint.x / viewBoxWidth) * rect.width;
    
    // Y position is aligned to the higher of the visible paths
    const targetY = showIn && (!showOut || hoveredPoint.yIn < hoveredPoint.yOut) 
      ? hoveredPoint.yIn 
      : hoveredPoint.yOut;

    const clientY = (targetY / viewBoxHeight) * rect.height;

    setTooltipPos({
      x: computedTooltipX,
      y: clientY - 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // Grid line levels
  const gridLevels = 3;
  const gridLineValues = Array.from({ length: gridLevels }, (_, i) => {
    return minVal + ((gridLevels - 1 - i) / (gridLevels - 1)) * (maxVal - minVal);
  });

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Interactive Legends */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIn(!showIn)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all border ${
              showIn
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-semibold'
                : 'bg-transparent border-[#2d2d4e] text-gray-500'
            }`}
          >
            <ArrowUpRight size={12} />
            Money In
          </button>
          <button
            onClick={() => setShowOut(!showOut)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all border ${
              showOut
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 font-semibold'
                : 'bg-transparent border-[#2d2d4e] text-gray-500'
            }`}
          >
            <ArrowDownRight size={12} />
            Money Out
          </button>
        </div>
        <span className="text-gray-500 flex items-center gap-1">
          <Eye size={12} /> Toggle lines
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 w-full min-h-[140px]">
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          className="w-full h-full select-none overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Defs / Gradients */}
          <defs>
            <linearGradient id="inAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
            </linearGradient>
            <linearGradient id="outAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridLineValues.map((val, idx) => {
            const y = paddingTop + (idx / (gridLevels - 1)) * chartHeight;
            return (
              <g key={idx} className="opacity-30">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={viewBoxWidth - paddingRight}
                  y2={y}
                  stroke="#2d2d4e"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  className="text-[9px] font-semibold"
                >
                  {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Money In Area & Line */}
          {showIn && points.length > 0 && (
            <g className="transition-all duration-300">
              <path d={inAreaPath} fill="url(#inAreaGrad)" />
              <path
                d={inLinePath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* Money Out Area & Line */}
          {showOut && points.length > 0 && (
            <g className="transition-all duration-300">
              <path d={outAreaPath} fill="url(#outAreaGrad)" />
              <path
                d={outLinePath}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}

          {/* Axis labels (X) */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={viewBoxHeight - paddingBottom + 16}
              textAnchor="middle"
              fill="#64748b"
              className="text-[9px] font-semibold"
            >
              {p.label}
            </text>
          ))}

          {/* Hover highlight line */}
          {hoveredIndex !== null && (showIn || showOut) && (
            <line
              x1={points[hoveredIndex].x}
              y1={paddingTop}
              x2={points[hoveredIndex].x}
              y2={viewBoxHeight - paddingBottom}
              stroke="#6366f1"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              strokeDasharray="2 2"
            />
          )}

          {/* Interactive markers */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g key={idx}>
                {/* Money In marker */}
                {showIn && (
                  <circle
                    cx={p.x}
                    cy={p.yIn}
                    r={isHovered ? "4.5" : "3"}
                    fill={isHovered ? "#34d399" : "#10b981"}
                    stroke="#1a1a2e"
                    strokeWidth={isHovered ? "1.5" : "1"}
                    className="transition-all duration-150"
                  />
                )}
                {/* Money Out marker */}
                {showOut && (
                  <circle
                    cx={p.x}
                    cy={p.yOut}
                    r={isHovered ? "4.5" : "3"}
                    fill={isHovered ? "#fb7185" : "#f43f5e"}
                    stroke="#1a1a2e"
                    strokeWidth={isHovered ? "1.5" : "1"}
                    className="transition-all duration-150"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        {hoveredIndex !== null && (showIn || showOut) && (
          <div
            className="absolute pointer-events-none z-10 bg-[#0f0f1a]/95 border border-[#2d2d4e] rounded-lg p-2 shadow-xl backdrop-blur-md"
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="text-[9px] text-gray-400 font-semibold mb-1">
              {points[hoveredIndex].label} Summary
            </div>
            <div className="space-y-0.5 text-[10px] font-bold">
              {showIn && (
                <div className="text-emerald-400 flex justify-between gap-4">
                  <span>In:</span>
                  <span>LKR {points[hoveredIndex].moneyIn.toLocaleString()}</span>
                </div>
              )}
              {showOut && (
                <div className="text-rose-400 flex justify-between gap-4">
                  <span>Out:</span>
                  <span>LKR {points[hoveredIndex].moneyOut.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
