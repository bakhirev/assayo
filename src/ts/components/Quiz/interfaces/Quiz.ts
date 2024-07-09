import IQuestion from './Question';
import IResult from './Result';

export default interface IQuiz {
  id?: number;
  icon?: string;
  title?: string;
  description?: string;
  button?: string;
  questions: IQuestion[];
  results: IResult[];
}
