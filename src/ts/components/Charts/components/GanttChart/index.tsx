import React from 'react';

import Сircle from './components/Сircle';
import Line from './components/Line';
import MarkerLine from './components/MarkerLine';
import MarkerText from './components/MarkerText';
import { defaultFormatter } from './helpers';
import style from './index.module.scss';

interface GanttChartProps {
  lines?: any;
  markersText?: any[];
  markersLine?: any[];
  formatter?: Function;
  className?: string;
  mode?: string;
}

function GanttChart({
  lines,
  markersText,
  markersLine,
  formatter,
  className,
  mode,
}: GanttChartProps): React.ReactElement | null {
  const getPosition = formatter || defaultFormatter;

  const markersLineElements = (markersLine || []).map((line: any, index: number) => {
    const [left] = getPosition('marker', line);
    return (
      <MarkerLine
        key={index}
        left={left}
      />
    );
  });

  const markersTextElements = (markersText || []).map((line: any, index: number) => {
    const [left, right] = getPosition('marker', line);
    return (
      <MarkerText
        key={index}
        left={left}
        right={right}
        title={line.title}
      />
    );
  });

  const paths = (lines || []).map((line: any, index: number) => {
    const [left, right] = getPosition('line', line);
    return mode ? (
      <Сircle
        key={index}
        right={right}
      />
    ) : (
      <Line
        key={index}
        left={left}
        right={right}
      />
    );
  });

  return (
    <div className={`${style.gantt_chart} ${className || ''}`}>
      {paths}
      {markersLineElements}
      {markersTextElements}
    </div>
  );
}

GanttChart.defaultProps = {
  className: '',
};

export default GanttChart;
