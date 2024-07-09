import React, { useState } from 'react';

import Result from './Result';
import Question from './Question';
import Start from './Start';

import IQuiz from '../interfaces/Quiz';
import IQuestion from '../interfaces/Question';
import IAnswer from '../interfaces/Answer';
import IResult from '../interfaces/Result';

import { getResult, getQuestionByGroups } from '../helpers';

import style from '../styles/index.module.scss';

function getApplyInAnimation(setShowSlide: Function, delay: number) {
  return (callback: Function) => {
    setShowSlide(true);
    setTimeout(() => {
      callback();
    }, delay / 2);
    setTimeout(() => {
      setShowSlide(false);
    }, delay);
  };
}

interface IQuizPageProps {
  quiz: IQuiz;
  onEnd: Function;
}

function QuizPage({
  quiz,
  onEnd,
}: IQuizPageProps): React.ReactElement | null {
  const [question, setQuestion] = useState<IQuestion>(quiz.questions[0]);
  const [result, setResult] = useState<IResult>(quiz.results[0]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [view, setView] = useState<string>('start');
  const [showSlide, setShowSlide] = useState<boolean>(false);
  const applyInAnimation = getApplyInAnimation(setShowSlide, 1500);

  const questions = getQuestionByGroups(quiz.questions);
  let page: any = null;

  if (view === 'start') {
    page = (
      <Start
        quiz={quiz}
        onClick={() => {
          applyInAnimation(() => {
            setView('question');
          });
        }}
      />
    );
  }

  if (view === 'question') {
    page = (
      <Question
        question={question}
        onClick={(answer: IAnswer) => {
          const nextById = questions.byId[answer.nextQuestionId || ''];
          const nextByIndex = questions.byIndex[question.index + 1];
          const newResult = getResult(answers, quiz.results);
          setAnswers([...answers, answer]);

          if (answer.isEnd) {
            applyInAnimation(() => {
              setResult(newResult);
              setView('result');
            });
          } if (answer.nextQuestionId && nextById) {
            applyInAnimation(() => {
              setQuestion(nextById);
            });
          } else if (nextByIndex) {
            applyInAnimation(() => {
              setQuestion(nextByIndex);
            });
          } else {
            applyInAnimation(() => {
              setResult(newResult);
              setView('result');
            });
          }
        }}
      />
    );
  }

  if (view === 'result') {
    page = (
      <Result
        result={result}
        onClick={() => {
          applyInAnimation(() => {
            onEnd();
            setQuestion(quiz.questions[0]);
            setAnswers([]);
            setView('start');
          });
        }}
      />
    );
  }

  const className = showSlide
    ? `${style.quiz_slider} ${style.quiz_slider_animation}`
    : style.quiz_slider;

  return (
    <div
      className={style.quiz_container}
      style={{ backgroundImage: 'url(./assets/games/quiz/cloud_bg.png)' }}
    >
      <div
        className={style.quiz_cloud_bg}
        style={{ backgroundImage: 'url(./assets/games/quiz/cloud_bg.png)' }}
      />
      <div
        className={style.quiz_cloud}
        style={{ backgroundImage: 'url(./assets/games/quiz/cloud.png)' }}
      />
      <div className={className}>
        {page}
      </div>
    </div>
  );
}

export default QuizPage;
