import ISort from 'ts/interfaces/Sort';
import { IColumn } from '../interfaces/Column';

function getColumnConfigs(
  dirtyColumns: IColumn[] = [],
  adaptiveWidth: number = 150,
  sort?: ISort[],
): IColumn[] {
  const sortByColumns = sort?.reduce((ref: any, item: ISort) => {
    ref[item.property] = item.direction;
    return ref;
  }, {});

  const columns: IColumn[] = dirtyColumns.map((column: IColumn) => {
    const adaptiveColumnWidth = column.minWidth
      ? Math.max(column.minWidth, adaptiveWidth)
      : adaptiveWidth;

    return {
      ...column,
      sortDirection: typeof column?.isSortable === 'string'
        ? (sortByColumns[column?.isSortable || ''] || 0)
        : (sortByColumns[column?.properties || ''] || 0),
      width: column.userWidth || column.defaultWidth || adaptiveColumnWidth, // || column.width || 150,
    };
  });

  const middle = Math.floor(columns.length / 2);
  return [
    ...columns.filter((column: IColumn, index: number) => column.isFixed && index <= middle),
    ...columns.filter((column: IColumn) => !column.isFixed),
    ...columns.filter((column: IColumn, index: number) => column.isFixed && index > middle),
  ];
}

export default getColumnConfigs;
