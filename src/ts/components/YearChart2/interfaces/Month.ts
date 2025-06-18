import IHashMap from 'ts/interfaces/HashMap';

import IWorkDay from './WorkDay';

export default interface IMonth {
  id: string;
  month: number;
  year: number;
  first: boolean;
  last: boolean;
  date: Date;
  firstDay?: IHashMap<any>;
  lastDay?: IHashMap<any>;
  commits: IWorkDay[];
  tasks?: number;
  money?: number;
}