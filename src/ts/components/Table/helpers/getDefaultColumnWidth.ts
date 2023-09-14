import type { IColumn } from '../interfaces/Column';

export default function getDefaultColumnWidth(
  columns: IColumn[],
  offsetWidth: number,
): number {
  if (!offsetWidth) return 150;
  const visibleColumns = columns.filter(({ isShow }: IColumn) => isShow);

  const columnsWidth = visibleColumns.map((column: IColumn) => (
    column.userWidth || column.defaultWidth || 0
  ));
  const fixedWidth = columnsWidth.reduce((sum: number, width: number) => sum + width, 0);
  const adaptiveColumnsCount = columnsWidth.filter((width: number) => !width).length;
  if (!adaptiveColumnsCount) return 40;

  const tableWidth = offsetWidth - fixedWidth;
  const adaptiveColumnsWidth = tableWidth / adaptiveColumnsCount;
  console.dir(adaptiveColumnsWidth);

  return Math.max(adaptiveColumnsWidth, 40);
}
