import dataGripStore from 'ts/store/DataGrip';
import { getRandom, shuffle } from 'ts/helpers/random';

import IQuiz from '../interfaces/Quiz';
import getQuestion from './getQuestion';

function getQuestionByList(
  authors: any[],
  question: string,
  getValue: Function,
  rightIndex?: number,
) {
  const answers = authors
    .sort((a, b) => getValue(b) - getValue(a))
    .slice(0, 3)
    .map((data) => data.author);
  const rightAnswer = answers[rightIndex || 0];
  const formattedAnswers = shuffle(answers);
  return getQuestion(question, formattedAnswers, formattedAnswers.indexOf(rightAnswer));
}

function getQuestionByNumber(question: string, rightAnswer: number) {
  let a, b;
  if (rightAnswer < 3) {
    a = rightAnswer + 1;
    b = rightAnswer + 2;
  } else {
    a = rightAnswer + (getRandom(rightAnswer) * (Math.random() > 0.5 ? 1 : -1));
    b = rightAnswer + (getRandom(rightAnswer) * (Math.random() > 0.5 ? 1 : -1));
    if (a === b) return null;
  }
  const answers = shuffle([rightAnswer, a, b]);
  return getQuestion(question, answers, answers.indexOf(rightAnswer));
}

function getHowTaskInDay(user: any) {
  if (!user) return null;
  const question = `Сколько максимум задач в день делал ${user.author}?`;
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[user.author];
  const rightAnswer = byTimestamp.tasksByTimestampCounter.max;
  return getQuestionByNumber(question, rightAnswer);
}

export default function getQuizQuestions(): IQuiz {
  const authorsWithStaff = [...dataGripStore.dataGrip.author.statistic];
  const authors = authorsWithStaff.filter((data) => !data.isStaff);
  const dismissed = dataGripStore.dataGrip.author.employment.dismissed.length;
  const staff = dataGripStore.dataGrip.author.employment.staff.length;
  // const types = shuffle(dataGripStore.dataGrip.type.list.slice(2)).slice(0, 3);
  const randomUsers = shuffle([...authors]).slice(0, 3);

  // сколько в среднем работают на проекте
  // во сколько чаще всего комитят
  // Кто устроился на работу в __Янаваре
  // Кто первый стал коммитить ночью
  // Задач какого типа больше

  const questions = [
    getQuestionByList(authorsWithStaff, 'Кто сделал первый коммит?', (s: any) => s.firstCommit.milliseconds),
    getQuestionByList(authors, 'Кто закрыл больше задач?', (s: any) => s.tasks.length),
    getQuestionByList(authors, 'Кто быстрее всех делает задачи?', (s: any) => s.taskInDay),
    getQuestionByList(authors, 'Кто дольше всех работал на проекте?', (s: any) => s.daysAll),
    getQuestionByList(authors, 'Кто меньше всех работал на проекте?', (s: any) => s.daysAll, 2),
    getQuestionByList(authors, 'Кто чаще коммитит?', (s: any) => s.commits / s.daysWorked),
    getQuestionByList(authors, 'Кто реже коммитит?', (s: any) => s.commits / s.daysWorked, 2),
    getQuestionByList(authors, 'У кого саммые длинные подписи коммитов?', (s: any) => s.middleMessageLength),
    getQuestionByList(authors, 'У кого саммые короткие подписи коммитов?', (s: any) => s.middleMessageLength, 2),
    getQuestionByList(authors, 'У кого больше всего дней без коммитов?', (s: any) => s.daysLosses / s.daysWorked, 2),
    getQuestionByNumber('Сколько человек уволилось?', dismissed),
    getQuestionByNumber('Сколько человек помогало проекту?', staff),
    getHowTaskInDay(randomUsers[0]),
    getHowTaskInDay(randomUsers[1]),
    getHowTaskInDay(randomUsers[2]),
  ]
    .filter((question) => question)
    .map((question, i: number) => ({ ...question, index: i + 1 }));

  return {
    title: '',
    description: 'Насколько хорошо ты знаешь команду?',
    questions: shuffle(questions),
    results: [
      {
        title: 'Поздравляем, пытка окончена',
        description: 'Вы протестировали этот квиз и готовы написать на него отзыв длинной два или три предложения.',
        min: 0,
        max: 60,
      },
    ],
  };
}
