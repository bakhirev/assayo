import React from 'react';

import { getPRHref, getTaskHref } from 'ts/components/Layout/ExternalLink/helpers';
import { t } from 'ts/helpers/Localization';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import { ColumnTypes, IColumn } from '../components/Table/interfaces/Column';
import { getDate, getDateForExcel } from './formatter';
import { getXMLForExcel } from './exportToExcel';

export function downloadFile(file: Blob, fileName: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
}

function getColumnsFromChildren(children: React.ReactNode) {
  const columns = React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement<IColumn>(child)) return null;
    const template = child.props.template || ColumnTypes.STRING;
    return {
      ...child.props as object,
      template,
    };
  });

  const exportableWithoutTitle = [
    ColumnTypes.PULL_REQUESTS,
    ColumnTypes.TASK,
    ColumnTypes.TAGS,
  ];

  // @ts-ignore
  const correctColumns = Array.from(columns)
    .filter((column: IColumn) => column?.title
      || exportableWithoutTitle.includes(column?.template as ColumnTypes));

  return correctColumns;
}

function getTitles(columns: IColumn[]) {
  return columns.map((column: IColumn) => (
    t(typeof column.title === 'string' ? column.title : '')
  ));
}

function getFormatter(columns: IColumn[]) {
  return (item: any) => {
    return columns.map((column: IColumn) => {
      let value = column.properties
        ? item[column.properties]
        : item;

      if (column.formatter === getDate) {
        return getDateForExcel(value);
      }

      if (column.formatter) {
        value = column.formatter(value);
      }

      if (column.template === ColumnTypes.TASK) {
        const task = typeof value === 'string' ? value : '';
        const href = getTaskHref(task);
        return href ? { href, text: task } : '';
      }

      if (column.template === ColumnTypes.PULL_REQUESTS) {
        const prIds = Array.isArray(value) ? value : [];
        if (!prIds.length) return '';
        const prByName = statisticStore.statisticsByCommits.pr.totalInfoByName;
        const prExternalId = prByName.get(prIds[0])?.prExternalId;
        const href = getPRHref(prExternalId);
        if (!href) return '';
        const extra = prIds.length > 1 ? ` +${prIds.length - 1}` : '';
        return { href, text: `PR${extra}` }; // TODO: вот тут все ссылки должны быть, а не первая
      }

      if (Array.isArray(value)) {
        return value.join(', ');
      }

      if (column.template === ColumnTypes.TAGS) {
        const key = value && typeof value === 'object' ? value.title : value;
        return t(key || '');
      }

      const type = typeof value;
      if (type === 'object') {
        if (!column.formatter && column.template) return '';

        return Object.entries(value)
          .map((row: any) => `${t(row[0]) || ''}: ${row[1] || ''}`)
          .join(', ');
      }

      return value;
    });
  };
}

export function downloadCsv(
  list: Array<any>,
  children: React.ReactNode,
  name?: string,
) {
  const columns = getColumnsFromChildren(children);
  const formatter = getFormatter(columns);
  const csvFile = [
    getTitles(columns).join(';'),
    ...list.map((item: any) => formatter(item).map((cell: any) => (
      cell?.href || cell
    )).join(';')),
  ].join('\n');

  const type = 'text/csv;charset=windows-1251;'; // utf-8;';
  const file = new Blob([csvFile], { type });
  const fileName = `${document.title} - ${name || ''}.csv`;
  return downloadFile(file, fileName);
}

export function downloadExcel(
  list: Array<any>,
  children: React.ReactNode,
  name?: string,
) {
  const columns = getColumnsFromChildren(children);
  const formatter = getFormatter(columns);
  const table = [
    getTitles(columns),
    ...list.map(formatter),
  ];

  const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const xlsxFile = getXMLForExcel(table);
  if (!xlsxFile) return;
  const blob = new Blob([xlsxFile], { type });
  return downloadFile(blob, `${name}.xlsx`);
}
