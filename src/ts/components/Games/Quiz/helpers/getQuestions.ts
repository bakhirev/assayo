import dataGripStore from 'ts/store/DataGrip';
import { shuffle } from 'ts/helpers/random';
import localization from 'ts/helpers/Localization';
import achievementByAuthor from 'ts/helpers/achievement/byCompetition';

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

function getRandomDiff(value: number) {
  return Math.random() > 0.5 ? value : -value;
}

function getQuestionByNumber(question: string, rightAnswer: number) {
  let a, b;
  if (rightAnswer < 3) {
    a = rightAnswer + 1;
    b = rightAnswer + 2;
  } else {
    const step = rightAnswer > 10
      ? Math.ceil(rightAnswer * 0.15)
      : 1;
    a = rightAnswer + getRandomDiff(step);
    b = rightAnswer + getRandomDiff(step * 2);
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

function getQuestionByAchievement(
  authors: any[],
  question: string,
  achievements: Function,
  achievement: string,
) {
  const rightAnswer = authors.find((author) => achievements?.[author]?.[achievement]);
  if (!rightAnswer) return null;

  const badAnswers = authors.filter((author) => author !== rightAnswer);
  const shortList = shuffle(badAnswers).slice(0, 2);
  const allAnswers = shuffle([...shortList, rightAnswer]);
  return getQuestion(question, allAnswers, allAnswers.indexOf(rightAnswer));
}

export default function getQuizQuestions(): IQuiz {
  const authorsWithStaff = [...dataGripStore.dataGrip.author.statistic];
  const authors = authorsWithStaff.filter((data) => !data.isStaff);
  const authorNames = authors.map((stat) => stat.author);
  const dismissed = dataGripStore.dataGrip.author.employment.dismissed.length;
  const staff = dataGripStore.dataGrip.author.employment.staff.length;
  const randomUsers = shuffle([...authors]).slice(0, 3);

  const achievements = authors.reduce((byAuthor, author) => {
    const list = achievementByAuthor.authors[author.author].flat(1);
    const entries = list.map((key) => [key, true]);
    byAuthor[author.author] = Object.fromEntries(entries);
    return byAuthor;
  }, {});

  const questions = [
    getQuestionByList(authorsWithStaff, 'page.team.building.quiz.question01', (s: any) => s.firstCommit.milliseconds),
    getQuestionByList(authors, 'page.team.building.quiz.question02', (s: any) => s.tasks.length),
    getQuestionByList(authors, 'page.team.building.quiz.question03', (s: any) => s.taskInDay),
    getQuestionByList(authors, 'page.team.building.quiz.question04', (s: any) => s.daysAll),
    getQuestionByList(authors, 'page.team.building.quiz.question05', (s: any) => s.daysAll, 2),
    getQuestionByAchievement(authorNames, 'page.team.building.quiz.question16', achievements, 'moreAddedFolders'),
    getQuestionByAchievement(authorNames, 'page.team.building.quiz.question17', achievements, 'longFilePath'),
    getQuestionByAchievement(authorNames, 'page.team.building.quiz.question18', achievements, 'morePRMerge'),
    getQuestionByAchievement(authorNames, 'page.team.building.quiz.question19', achievements, 'longestMessage'),
    getQuestionByAchievement(authorNames, 'page.team.building.quiz.question20', achievements, 'longWaitPR'),
    getQuestionByList(authors, 'page.team.building.quiz.question08', (s: any) => s.middleMessageLength),
    getQuestionByList(authors, 'page.team.building.quiz.question09', (s: any) => s.middleMessageLength, 2),
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
    description: 'page.team.building.quiz.begin',
    questions: shuffle(formattedQuestions),
    results: [
      {
        title: 'page.team.building.quiz.result1.title',
        description: 'page.team.building.quiz.result1.description',
        min: 0,
        max: 7,
      },
      {
        title: 'page.team.building.quiz.result2.title',
        description: 'page.team.building.quiz.result2.description',
        min: 8,
        max: 13,
      },
      {
        title: 'page.team.building.quiz.result3.title',
        description: 'page.team.building.quiz.result3.description',
        min: 14,
        max: 25,
      },
    ],
  };
}
