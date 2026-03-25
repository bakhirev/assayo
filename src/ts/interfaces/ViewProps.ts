import { IPagination } from './Pagination';

export default interface ViewProps<T = any> {
  response?: IPagination<T>;
  updateSort?: Function;
  rowsForExcel?: T[];
  mode?: string;
}
