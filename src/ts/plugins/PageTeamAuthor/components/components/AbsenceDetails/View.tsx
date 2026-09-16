import React from 'react';

import ViewProps from 'ts/interfaces/ViewProps';
import { getDate } from 'ts/helpers/formatter';

import UiKitTags from 'ts/components/UiKit/components/Tags';
import { UiKitTagMode } from 'ts/components/UiKit/components/Tag';
import { Table, Column, ColumnTypes } from 'ts/components/Table';
import { LineChart } from 'ts/components/Charts';

interface CustomViewProps extends ViewProps {
  max?: number;
}

function View({response, max}: CustomViewProps) {
  const list = [...(response?.content || [])];
  const firstItem = list[0];
  const lastItem = list[list.length - 1];
  if (firstItem?.year) list.shift();
  if (lastItem?.year) list.pop();

  return (
    <Table rows={list}>
      <Column
        template={ColumnTypes.STRING}
        properties="empty"
        width={40}
      />
      <Column
        title={firstItem?.year || firstItem?.from?.year}
        template={(row: any) => {
          if (!row.duration) {
            return <b>{row.year}</b>;
          }
          const value = row.duration > 40
            ? {title: 'plugin.team_author.absence.transfer', mode: UiKitTagMode.ERROR}
            : 'plugin.team_author.absence.vacation';
          return <UiKitTags value={value} />
        }}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="from"
        width={130}
        formatter={(value: any) => value?.milliseconds ? getDate(value?.milliseconds) : ''}
      />
      <Column
        template={ColumnTypes.STRING}
        properties="to"
        width={130}
        formatter={(value: any) => value?.milliseconds ? getDate(value?.milliseconds) : ''}
      />
      <Column
        template={ColumnTypes.SHORT_NUMBER}
        properties="duration"
        width={90}
      />
      <Column
        isSortable
        title="plugin.team_author.absence.duration"
        properties="duration"
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

export default View;
