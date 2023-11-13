import { IColumn, ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';

function getCardConfigs(
  dirtyColumns: IColumn[] = [],
): IColumn[] {
  const groups = dirtyColumns.reduce((
    acc: any,
    column: IColumn,
    index: number,
  ) => {
    const nextColumn = dirtyColumns[index + 1];
    if (column.template === ColumnTypesEnum.SHORT_NUMBER
      && typeof nextColumn?.template === 'function') {
      acc.text.push({
        ...column,
        title: nextColumn?.title,
      });
      return acc;
    }

    if (typeof column.template === 'function') {
      if (index > 0 && dirtyColumns[index - 1].template === ColumnTypesEnum.SHORT_NUMBER) {
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
