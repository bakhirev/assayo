import type { IColumn } from '../interfaces/Column';

export default function getAdaptiveColumnWidth(
  columns: IColumn[],
  offsetWidth: number,
): number {
  if (!offsetWidth) return 150;

  // количество колонок и фиксированная ширина
  const visibleColumns = columns.filter(({ isShow }: IColumn) => isShow);
  const columnsWidth = visibleColumns.map((column: IColumn) => (
    column.userWidth || column.defaultWidth || 0
  ));
  const fixedWidth = columnsWidth.reduce((sum: number, width: number) => sum + width, 0);
  let adaptiveColumnsCount = columnsWidth.filter((width: number) => !width).length;
  if (!adaptiveColumnsCount) return 40;

  // делаем предварительный расчёт
  let adaptiveTableWidth = offsetWidth - fixedWidth;
  let adaptiveColumnsWidth = Math.floor(adaptiveTableWidth / adaptiveColumnsCount);

  // если адаптив < минималки, то адаптив делает перерасчет
  visibleColumns.forEach((column: IColumn) => {
    if (
      (column.userWidth || column.defaultWidth) // если ширина известна
      || !column.minWidth  // если минималки нет
      || column.minWidth < adaptiveColumnsWidth  // если минималки меньше адаптива
      || !adaptiveColumnsCount // если столбиков уже нет
    ) return;

    adaptiveTableWidth -= column.minWidth;
    adaptiveColumnsCount -= 1;
    adaptiveColumnsWidth = adaptiveTableWidth / adaptiveColumnsCount;
  });

  return Math.max(adaptiveColumnsWidth || 40, 40);
}
