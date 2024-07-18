import React from 'react';
import { utils, writeFile } from 'xlsx';

import { t } from 'ts/helpers/Localization';
import { ColumnTypesEnum, IColumn } from '../components/Table/interfaces/Column';
import { getDate, getDateForExcel } from './formatter';

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
    if (!React.isValidElement(child)) return null;
    const template = child?.props?.template || ColumnTypesEnum.STRING;
    return {
      ...child.props as object,
      template,
    };
  });

  // @ts-ignore
  const correctColumns = Array.from(columns)
    .filter((column: IColumn) => column?.title);

  return correctColumns;
}

function getTitles(columns: IColumn[]) {
  return columns.map((column: IColumn) => t(column.title || ''));
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

      if (Array.isArray(value)) {
        return value.length;
      }

      const type = typeof value;
      if (type === 'object') {
        if (!column.formatter && column.template) return '';

        return Object.entries(value)
          .map((row: any) => `${t(row[0]) || ''}: ${row[1] || ''}`)
          .join(', ');
      }

      if (type === 'string') {
        return value.replace('.', ',');
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
    ...list.map((item: any) => formatter(item).join(';')),
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

  const ws = utils.aoa_to_sheet(table);
  ws['!cols'] = columns.map(() => ({ width: 20 }));

  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  writeFile(wb, `${name}.xlsx`);
}
