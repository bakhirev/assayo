import IAnswer from './Answer';

export default interface IQuestion {
  id?: number;
  index: number;
  title: string;
  answers?: IAnswer[];
  button?: string;
}
