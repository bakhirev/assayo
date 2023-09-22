import type { IColumn } from '../interfaces/Column';

export default function getAdaptiveColumnWidth(
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

  // если адаптив < минималки, то адаптив делает перерасчет
  let adaptiveTableWidth = tableWidth;
  let adaptiveColumnsWidth = adaptiveTableWidth / adaptiveColumnsCount;
  visibleColumns.forEach((column: IColumn) => {
    if (!column.minWidth
        || column.minWidth < adaptiveColumnsWidth) return;
    adaptiveTableWidth -= column.minWidth;
    adaptiveColumnsWidth = adaptiveTableWidth / adaptiveColumnsCount;
  });

  return Math.max(adaptiveColumnsWidth, 40);
}
