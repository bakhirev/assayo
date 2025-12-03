import { IColumn, ColumnTypes } from 'ts/components/Table/interfaces/Column';

function getCardConfigs(
  dirtyColumns: IColumn[] = [],
): IColumn[] {
  const groups = dirtyColumns.reduce((
    acc: any,
    column: IColumn,
    index: number,
  ) => {
    if (column.template === ColumnTypes.DETAILS) {
      return acc;
    }

    if (index === 0) {
      acc.text.push(column);
      return acc;
    }

    const nextColumn = dirtyColumns[index + 1];
    if (column.template === ColumnTypes.SHORT_NUMBER && typeof nextColumn?.template === 'function') {
      acc.text.push({
        ...column,
        title: nextColumn?.title,
      });
      return acc;
    }

    if (typeof column.template === 'function') {
      if (index > 0 && dirtyColumns[index - 1].template === ColumnTypes.SHORT_NUMBER) {
        acc.shortChart.push(column);
      } else {
        acc.longChart.push(column);
      }
    } else {
      acc.text.push(column);
    }

    return acc;
  }, { text: [], shortChart: [], longChart: [] });

  return [
    ...groups.text,
    ...groups.longChart,
    // ...groups.shortChart,
  ] as IColumn[];
}

export default getCardConfigs;
