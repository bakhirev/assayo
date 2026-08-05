import React, { useMemo } from 'react';

interface ArrowProps {
  fromId: string;
  toId: string;
  padding: {
    top: number;
    left: number;
  }
  isParent?: boolean;
}

export function Arrow({
  fromId,
  toId,
  padding,
  isParent,
}: ArrowProps) {
  if (!fromId || !toId) return null;

  const from = useMemo(() => {
    const element = document.getElementById(`dependencies_chart_${fromId}`);
    return element?.getBoundingClientRect() || {};
  }, [fromId]) as any;

  const to = useMemo(() => {
    const element = document.getElementById(`dependencies_chart_${toId}`);
    return element?.getBoundingClientRect() || {};
  }, [toId]) as any;

  return (
    <line
      x1={from.left - padding.left}
      y1={from.top - padding.top}
      x2={to.left - padding.left}
      y2={to.top - padding.top}
      stroke={isParent ? '#22C220' : '#ED675F'}
      strokeWidth="1"
    />
  );
}

export default Arrow;
