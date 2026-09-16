import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import IHashMap from 'ts/interfaces/HashMap';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { getMaxValues } from 'ts/helpers/charts';

import View from './View';

function getGroups(rows: any[]) {
  return rows.reduce((group: IHashMap<any>, row: any) => {
    const year = row.from.year;
    if (!group[year]) group[year] = [];
    group[year].push(row);
    return group;
  }, {});
}

function getOnlyShortsDurations(groups: IHashMap<any>) {
  return Object.entries(groups).reverse().map(([year, items]) => {
    const limit = 6;
    const formattedItems = items.length > limit
      ? items
        .sort((a: any, b: any) => b.duration - a.duration)
        .sort((a: any, b: any) => b.from.milliseconds - a.from.milliseconds)
      : items;

    return { year, formattedItems };
  });
}

interface AbsenceDetailsProps {
  rows?: any[];
}

function AbsenceDetails({ rows }: AbsenceDetailsProps) {
  if (!rows || !rows?.length) return null;

  const [max] = getMaxValues({ content: rows } as IPagination<any>, ['duration']);
  const groups = getGroups(rows);
  const sections = getOnlyShortsDurations(groups);
  const fakeRows = sections
    .map(({ year, formattedItems }: any) => [{ year }, ...formattedItems])
    .flat(1);
  console.log(fakeRows);

  return (
    <FakeDataLoader
      content={fakeRows}
      watch={`${rows?.length}`}
    >
      <View max={max} />
      <Pagination/>
    </FakeDataLoader>
  );
}

export default AbsenceDetails;
