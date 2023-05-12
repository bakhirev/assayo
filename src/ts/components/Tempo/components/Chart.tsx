import React from 'react';

import ICommit from 'ts/interfaces/Commit';
import IHashMap from 'ts/interfaces/HashMap';
import { get2Number } from 'ts/helpers/formatter';

import style from '../styles/chart.module.scss';

interface IChartProps {
  tasks: IHashMap<ICommit[]>;
}

function Chart({ tasks }: IChartProps) {
  const oneHours = 100 / 24;
  const commits = Object.values(tasks).flat(1);
  const values = commits.reduce((hours: number[], commit: ICommit) => {
    hours[commit.hours] += commit.changes +  commit.added +  commit.removed;
    return hours;
  }, (new Array(24)).fill(0));

  const dots = values.map((size: number, hours: number) => {
    if (!size) return null;
    const left = oneHours * hours;
    const height = Math.min(80, size / 1.5);
    return (
      <div
        key={hours}
        className={`${style.tempo_chart_dot}`}
        title={`${size} строк с ${get2Number(hours)}:00 до ${get2Number(hours + 1)}:00`}
        style={{ left: `${left}%`, height: `${height}%` }}
      />
    );
  });

  return (
    <div className={style.tempo_chart}>
      <div className={style.tempo_chart_dashboard}>
        {dots}
      </div>
      <div className={style.tempo_chart_legend}>
        <span className={style.tempo_chart_time}>00:00</span>
        <span className={style.tempo_chart_time}>06:00</span>
        <span className={style.tempo_chart_time}>12:00</span>
        <span className={style.tempo_chart_time}>18:00</span>
        <span className={style.tempo_chart_time}>00:00</span>
      </div>
    </div>
  );
}

export default Chart;
