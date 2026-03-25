import statisticStore from 'ts/store/Statistics';
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
  const question = localization.get('plugin.team_building.quiz.question13', user.author);
  const byTimestamp = statisticStore.statisticsByCommits.timestamp.totalInfoByName[user.author];
  const rightAnswer = byTimestamp.tasksByTimestampCounter.max;
  return getQuestionByNumber(question, rightAnswer);
}

function getHowTypes() {
  const notFirst = statisticStore.statisticsByCommits.type.list
    .slice(2)
    .filter((v: string) => v);
  if (notFirst.length < 3) return null;

  const answers = shuffle(notFirst).slice(0, 3);
  const [a, b, c] = answers.map((answer) => notFirst.indexOf(answer));

  let rightAnswer = 0;
  if (b < a && b < c) rightAnswer = 1;
  if (c < a && c < b) rightAnswer = 2;

  return getQuestion('plugin.team_building.quiz.question14', answers, rightAnswer);
}

function getHowDaysInProject(authors: any) {
  const days = authors.map((author: any) => author.allDaysInProject);
  const skip = Math.floor(authors.length * 0.2);
  const middle = days.slice(skip, authors.length - skip);
  if (middle.length < 3) return null;

  const rightAnswer = Math.ceil(days.reduce((a: number, b: number) => (a + b)) / days.length);
  return getQuestionByNumber('plugin.team_building.quiz.question15', rightAnswer);
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
  const authorsWithStaff = [...statisticStore.statisticsByCommits.author.totalInfo];
  const authors = authorsWithStaff.filter((data) => !data.isStaff);
  const authorNames = authors.map((stat) => stat.author);
  const dismissed = statisticStore.statisticsByCommits.author.employment.dismissed.length;
  const staff = statisticStore.statisticsByCommits.author.employment.staff.length;
  const randomUsers = shuffle([...authors]).slice(0, 3);

  const achievements = authors.reduce((byAuthor, author) => {
    const list = achievementByAuthor.authors[author.author].flat(1);
    const entries = list.map((key) => [key, true]);
    byAuthor[author.author] = Object.fromEntries(entries);
    return byAuthor;
  }, {});

  const questions = [
    getQuestionByList(authorsWithStaff, 'plugin.team_building.quiz.question01', (s: any) => s.firstCommit.milliseconds),
    getQuestionByList(authors, 'plugin.team_building.quiz.question02', (s: any) => s.tasks.length),
    getQuestionByList(authors, 'plugin.team_building.quiz.question03', (s: any) => s.taskInDay),
    getQuestionByList(authors, 'plugin.team_building.quiz.question04', (s: any) => s.daysAll),
    getQuestionByList(authors, 'plugin.team_building.quiz.question05', (s: any) => s.daysAll, 2),
    getQuestionByAchievement(authorNames, 'plugin.team_building.quiz.question16', achievements, 'moreAddedFolders'),
    getQuestionByAchievement(authorNames, 'plugin.team_building.quiz.question17', achievements, 'longFilePath'),
    getQuestionByAchievement(authorNames, 'plugin.team_building.quiz.question18', achievements, 'morePRMerge'),
    getQuestionByAchievement(authorNames, 'plugin.team_building.quiz.question19', achievements, 'longestMessage'),
    getQuestionByAchievement(authorNames, 'plugin.team_building.quiz.question20', achievements, 'longWaitPR'),
    getQuestionByList(authors, 'plugin.team_building.quiz.question08', (s: any) => s.middleMessageLength),
    getQuestionByList(authors, 'plugin.team_building.quiz.question09', (s: any) => s.middleMessageLength, 2),
    getQuestionByNumber('plugin.team_building.quiz.question11', dismissed),
    getQuestionByNumber('plugin.team_building.quiz.question12', staff),
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
    description: 'plugin.team_building.quiz.begin',
    questions: shuffle(formattedQuestions),
    results: [
      {
        title: 'plugin.team_building.quiz.result1.title',
        description: 'plugin.team_building.quiz.result1.description',
        min: 0,
        max: 7,
      },
      {
        title: 'plugin.team_building.quiz.result2.title',
        description: 'plugin.team_building.quiz.result2.description',
        min: 8,
        max: 13,
      },
      {
        title: 'plugin.team_building.quiz.result3.title',
        description: 'plugin.team_building.quiz.result3.description',
        min: 14,
        max: 25,
      },
    ],
  };
}
