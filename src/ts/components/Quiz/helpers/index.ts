import IQuestion from '../interfaces/Question';
import IAnswer from '../interfaces/Answer';
import IResult from '../interfaces/Result';

export function getQuestionByGroups(questions: IQuestion[]) {
  const byId = {};
  const byIndex = {};

  questions.forEach((question: IQuestion, index: number) => {
    if (question?.id) byId[question?.id] = question;
    byIndex[index] = question;
    question.index = index;
  });

  return { byId, byIndex };
}

export function getResult(answers: IAnswer[], results: IResult[]) {
  const total = answers.reduce((sum: number, answer: IAnswer) => (
    sum + (answer.score || 0)
  ), 0);

  let result = results[0];
  results.forEach((item: IResult) => {
    if (item.min && item.max && total >= item.min && total <= item.max) {
      result = item;
    } else if (item.min && !item.max && total >= item.min) {
      result = item;
    }  else if (!item.min && item.max && total <= item.max) {
      result = item;
    }
  });

  return result;
}
