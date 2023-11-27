import React from 'react';
import { ColumnTypesEnum, IColumn } from '../components/Table/interfaces/Column';
// import localization from './Localization';

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
  return columns.map((column: IColumn) => (column.title || '').split('.').pop());
}

function getFormatter(columns: IColumn[]) {
  return (item: any) => {
    return columns.map((column: IColumn) => {
      let value = column.properties
        ? item[column.properties]
        : item;

      if (column.formatter) {
        value = column.formatter(value);
      }

      if (Array.isArray(value)) {
        return value.length;
      }

      const type = typeof value;
      if (type === 'object') {
        return JSON.stringify(value);
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
  console.dir(columns);
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