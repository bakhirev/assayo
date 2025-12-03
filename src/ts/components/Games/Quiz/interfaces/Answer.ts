export default interface IAnswer {
  id?: number;
  title: string;
  icon?: string;
  score?: number;
  isEnd?: boolean;
  nextQuestionId?: number;
}
