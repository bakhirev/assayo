import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import IHashMap from 'ts/interfaces/HashMap';
import { getDate } from 'ts/helpers/formatter';

import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';
import UiKitTags from 'ts/components/UiKit/components/Tags';

import { getMaxValues } from 'ts/helpers/getMax';

interface ViewProps {
  rows?: any[];
  max?: number;
  year?: string;
}

export function View({ rows, max, year }: ViewProps) {
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
        template={ColumnTypes.STRING}
        properties="from"
        minWidth={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        minWidth={130}
        formatter={getDate}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="duration"
      />
      <Column
        isSortable
        properties="duration"
        minWidth={200}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="page.team.author.days"
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

  const [max] = getMaxValues({ content: rows } as IPagination<any>, ['duration']);
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

  // TODO: выравнять по колонкам родителя
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
