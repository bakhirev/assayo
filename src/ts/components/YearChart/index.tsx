import React from 'react';

import getCommitsByMonth from './helpers/getCommitsByMonth';
import getAuthorByDate from './helpers/getAuthorByDate';
import Month from './components/Month';
import IMonth from './interfaces/Month';

interface IYearChartProps {
  maxCommits: number;
  wordDays: any[];
  authors: any[];
}

function YearChart({
  maxCommits = 100,
  wordDays = [],
  authors = [],
}: IYearChartProps): React.ReactElement | null {
  if (!wordDays || !wordDays.length) return null;

  const authorsByDate = getAuthorByDate(authors);
  const months = getCommitsByMonth(wordDays, authorsByDate);

  const elements = months.map((month: IMonth) => (
    <Month
      key={month.id}
      month={month}
      maxCommits={maxCommits}
    />
  ));

  return (
    <>
      {elements}
    </>
  );
}

YearChart.defaultProps = {
  rows: [],
};

export default YearChart;
