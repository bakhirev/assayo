import React from 'react';

import { IPagination } from 'ts/interfaces/Pagination';
import IHashMap from 'ts/interfaces/HashMap';
import { getDate } from 'ts/helpers/formatter';

import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

import { getMaxValues } from 'ts/helpers/charts';

interface ViewProps {
  rows?: any[];
  max?: number;
  year?: string;
}

export function View({ rows, max, year }: ViewProps) {
  return (
    <Table rows={rows}>
      <Column
        template={ColumnTypes.STRING}
        properties="empty"
        width={40}
      />
      <Column
        title={year}
        formatter={(row: any) => {
          return row.duration > 40
            ? 'plugin.team_author.absence.transfer'
            : 'plugin.team_author.absence.vacation';
        }}
        template={ColumnTypes.TAGS}
        minWidth={300}
      />
      <Column
        properties="empty2"
        template={ColumnTypes.STRING}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="from"
        width={130}
        formatter={(value: any) => getDate(value.milliseconds)}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        width={130}
        formatter={(value: any) => getDate(value.milliseconds)}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="duration"
        width={90}
      />
      <Column
        isSortable
        properties="duration"
        title="plugin.team_author.absence.duration"
        width={290}
        template={(value: number) => (
          <LineChart
            value={value}
            max={max}
            suffix="common.statistic.days"
          />
        )}
      />
    </Table>
  );
}

function getGroups(rows: any[]) {
  return rows.reduce((group: IHashMap<any>, row: any) => {
    const year = row.from.year;
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
        .sort((a: any, b: any) => b.from.milliseconds - a.from.milliseconds)
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
    <>
      {sections}
    </>
  );
}

AbsenceDetails.defaultProps = {
  response: undefined,
};

export default AbsenceDetails;
