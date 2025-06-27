import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import IHashMap from 'ts/interfaces/HashMap';
import { getDate } from 'ts/helpers/formatter';

import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';
import UiKitTags from 'ts/components/UiKit/components/Tags';

import { getMax } from 'ts/pages/Common/helpers/getMax';

interface ViewProps {
  rows?: any[];
  max?: number;
  year?: string;
}

export function View({ rows, max, year }: ViewProps) {
  const durationChart = getOptions({ max, suffix: 'page.team.author.days' });
  return (
    <Table rows={rows}>
      <Column
        title={year}
        formatter={(row: any) => {
          return row.duration > 40
            ? 'page.team.author.absence.transfer'
            : 'page.team.author.absence.vacation';
        }}
        template={(value: string) => <UiKitTags value={value}/>}
        minWidth={200}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="from"
        minWidth={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.STRING}
        properties="to"
        minWidth={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypesEnum.SHORT_NUMBER}
        properties="duration"
      />
      <Column
        isSortable
        properties="duration"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            options={durationChart}
            value={value}
          />
        )}
      />
    </Table>
  );
}

function getGroups(rows: any[]) {
  return rows.reduce((group: IHashMap<any>, row: any) => {
    const year = row.timestamp.from.substring(0, 4);
    if (!group[year]) group[year] = [];
    group[year].push(row);
    return group;
  }, {});
}

interface AbsenceDetailsProps {
  rows?: any[];
}

export function AbsenceDetails({ rows }: AbsenceDetailsProps) {
  if (!rows || !rows?.length) return null;

  const max = getMax({ content: rows } as IPagination<any>, 'duration');
  const groups = getGroups(rows);

  const sections = Object.entries(groups).reverse().map(([year, items]) => {
    const limit = 6;
    const formattedItems = items.length > limit
      ? items
        .sort((a: any, b: any) => b.duration - a.duration)
        .slice(0, limit - 1)
        .sort((a: any, b: any) => b.from - a.from)
      : items;

    return (
      <View
        key={year}
        max={max}
        rows={formattedItems}
        year={year}
      />
    );
  });

  return (
    <div style={{ maxWidth: 750 }}>
      {sections}
    </div>
  );
}

AbsenceDetails.defaultProps = {
  response: undefined,
};

export default AbsenceDetails;
