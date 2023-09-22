import React from 'react';

import MinMaxCounter from 'ts/helpers/DataGrip/components/counter';

import getCommitsByMonth from './helpers/getCommitsByMonth';
import getAuthorByDate from './helpers/getAuthorByDate';
import Month from './components/Month';
import IMonth from './interfaces/Month';

interface IYearChartProps {
  maxCommits: number;
  showEvents?: boolean;
  wordDays: any[];
  authors: any[];
}

function YearChart({
  maxCommits = 100,
  showEvents = true,
  wordDays = [],
  authors = [],
}: IYearChartProps): React.ReactElement | null {
  if (!wordDays || !wordDays.length) return null;

  const authorsByDate = getAuthorByDate(authors);
  const months = getCommitsByMonth(wordDays, authorsByDate);
  const hideMoney = authors?.length === 1;

  const max = {
    tasks: new MinMaxCounter(),
    money: new MinMaxCounter(),
  };

  months.forEach((month: IMonth) => {
    max.tasks.update(month.tasks);
    max.money.update(month.money);
  });

  const elements = months.map((month: IMonth) => (
    <Month
      key={month.id}
      max={{
        tasks: max.tasks.max,
        money: max.money.max,
        commits: maxCommits,
      }}
      month={month}
      showEvents={showEvents}
      hideMoney={hideMoney}
    />
  ));

  return (
    <>
      {elements}
    </>
  );
}

YearChart.defaultProps = {
  showEvents: true,
};

export default YearChart;
