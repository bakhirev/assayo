export type ColumnType = 'STRING' | 'NUMBER' | 'SHORT_NUMBER' | 'DETAILS';

/** Тип столбца определяет тип содержимого всех ячеек столбца */
export enum ColumnTypesEnum {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  SHORT_NUMBER = 'SHORT_NUMBER',
  DETAILS = 'DETAILS',
}

export interface IColumn {
  /** Тип столбца */
  template?: ColumnTypesEnum | Function;
  /** Уникальный ключ столбца */
  properties?: string;
  /** Заголовок столбца */
  title?: string;
  /** Префиксы для заголовка столбца */
  prefixes?: string;
  /** Суффиксы для заголовка столбца (%; $ и т.д.) */
  suffixes?: string;
  /** Функция для форматирования данных в столбце */
  formatter?: Function;

  /** Направление сортировки */
  sortDirection?: number;

  /** Фиксированный столбец */
  isFixed?: boolean;
  /** Сортировка столбца */
  isSortable?: boolean | string;
  /** Изменение ширины столбца */
  isResizable?: boolean;
  /** Drag-and-Drop столбца */
  isDraggable?: boolean;
  /** Видимость столбца */
  isShow?: boolean;
  /** Клас для колонки */
  className?: string | Function
  /** Стилья для колонки */
  style?: Function;
  /** Минимальная ширина столбца если он адаптивен */
  minWidth?: number;
  /** Ширина столбца заданная в верстке */
  defaultWidth?: number;
  /** Ширина столбца установленная пользователем */
  userWidth?: number;
  /** Ширина столбца итоговая */
  width?: number;
  /** Клик на ячейку */
  onClick?: Function;
}

export interface IRowsConfig {
  /** ID строки */
  id: string | number;
  /** Строка раскрыта */
  details?: boolean;
  /** Строка не активна */
  disabled?: boolean;
}
