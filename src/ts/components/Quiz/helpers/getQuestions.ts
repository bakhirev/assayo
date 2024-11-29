import dataGripStore from 'ts/store/DataGrip';
import { getRandom, shuffle } from 'ts/helpers/random';
import localization from 'ts/helpers/Localization';

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
  const question = localization.get('page.team.building.quiz.question13', user.author);
  const byTimestamp = dataGripStore.dataGrip.timestamp.statisticByAuthor[user.author];
  const rightAnswer = byTimestamp.tasksByTimestampCounter.max;
  return getQuestionByNumber(question, rightAnswer);
}

function getHowTypes() {
  const notFirst = dataGripStore.dataGrip.type.list
    .slice(2)
    .filter((v: string) => v);
  if (notFirst.length < 3) return null;

  const answers = shuffle(notFirst).slice(0, 3);
  const [a, b, c] = answers.map((answer) => notFirst.indexOf(answer));

  let rightAnswer = 0;
  if (b < a && b < c) rightAnswer = 1;
  if (c < a && c < b) rightAnswer = 2;

  return getQuestion('page.team.building.quiz.question14', answers, rightAnswer);
}

function getHowDaysInProject(authors: any) {
  const days = authors.map((author: any) => author.allDaysInProject);
  const skip = Math.floor(authors.length * 0.2);
  const middle = days.slice(skip, authors.length - skip);
  if (middle.length < 3) return null;

  const rightAnswer = Math.ceil(days.reduce((a: number, b: number) => (a + b)) / days.length);
  return getQuestionByNumber('page.team.building.quiz.question15', rightAnswer);
}

export default function getQuizQuestions(): IQuiz {
  const authorsWithStaff = [...dataGripStore.dataGrip.author.statistic];
  const authors = authorsWithStaff.filter((data) => !data.isStaff);
  const dismissed = dataGripStore.dataGrip.author.employment.dismissed.length;
  const staff = dataGripStore.dataGrip.author.employment.staff.length;
  const randomUsers = shuffle([...authors]).slice(0, 3);

  // во сколько чаще всего комитят
  // Кто устроился на работу в __Янаваре
  // Кто первый стал коммитить ночью

  const questions = [
    getQuestionByList(authorsWithStaff, 'page.team.building.quiz.question01', (s: any) => s.firstCommit.milliseconds),
    getQuestionByList(authors, 'page.team.building.quiz.question02', (s: any) => s.tasks.length),
    getQuestionByList(authors, 'page.team.building.quiz.question03', (s: any) => s.taskInDay),
    getQuestionByList(authors, 'page.team.building.quiz.question04', (s: any) => s.daysAll),
    getQuestionByList(authors, 'page.team.building.quiz.question05', (s: any) => s.daysAll, 2),
    getQuestionByList(authors, 'page.team.building.quiz.question06', (s: any) => s.commits / s.daysWorked),
    getQuestionByList(authors, 'page.team.building.quiz.question07', (s: any) => s.commits / s.daysWorked, 2),
    getQuestionByList(authors, 'page.team.building.quiz.question08', (s: any) => s.middleMessageLength),
    getQuestionByList(authors, 'page.team.building.quiz.question09', (s: any) => s.middleMessageLength, 2),
    getQuestionByList(authors, 'page.team.building.quiz.question10', (s: any) => s.daysLosses / s.daysWorked, 2),
    getQuestionByNumber('page.team.building.quiz.question11', dismissed),
    getQuestionByNumber('page.team.building.quiz.question12', staff),
    getHowTaskInDay(randomUsers[0]),
    getHowTaskInDay(randomUsers[1]),
    getHowTaskInDay(randomUsers[2]),
    getHowTypes(),
    getHowDaysInProject(authors),
  ];

  const formattedQuestions = questions
    .filter((question) => question)
    .map((question, i: number) => ({ ...question, index: i + 1 }));

  return {
    title: '',
    description: 'Насколько хорошо ты знаешь команду?',
    questions: shuffle(formattedQuestions),
    results: [
      {
        title: 'Недостаточно',
        description: 'Правильных ответов меньше 40%. Ознакомьтесь с данными о вашей команде в соседних разделах и попробуйте снова!',
        min: 0,
        max: 7,
      },
      {
        title: 'Хорошо',
        description: 'Правильных ответов от 40% до 70%. Вы имеете хорошее представление о вашей команде, но можете узнать её лучше. Ознакомьтесь с данными в соседних разделах и попробуйте снова!',
        min: 8,
        max: 13,
      },
      {
        title: 'Отлично',
        description: 'Правильных ответов больше 70%. Вы отлично знаете статистику по вашей команде. !',
        min: 14,
        max: 25,
      },
    ],
  };
}
