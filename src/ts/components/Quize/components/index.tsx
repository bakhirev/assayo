import React, { useState } from 'react';

import Result from './Result';
import Question from './Question';
import Start from './Start';

import IQuize from '../interfaces/Quize';
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

interface IQuizePageProps {
  quize: IQuize;
  onEnd: Function;
}

function QuizePage({
  quize,
  onEnd,
}: IQuizePageProps): React.ReactElement | null {
  const [question, setQuestion] = useState<IQuestion>(quize.questions[0]);
  const [result, setResult] = useState<IResult>(quize.results[0]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [view, setView] = useState<string>('start');
  const [showSlide, setShowSlide] = useState<boolean>(false);
  const applyInAnimation = getApplyInAnimation(setShowSlide, 1500);

  const questions = getQuestionByGroups(quize.questions);
  let page: any = null;

  if (view === 'start') {
    page = (
      <Start
        quize={quize}
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
          const newResult = getResult(answers, quize.results);
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
            setQuestion(quize.questions[0]);
            setAnswers([]);
            setView('start');
          });
        }}
      />
    );
  }

  const className = showSlide
    ? `${style.quize_slider} ${style.quize_slider_animation}`
    : style.quize_slider;

  return (
    <div
      className={style.quize_container}
      style={{ backgroundImage: 'url(./assets/games/quize/air.jpg)' }}
    >
      <div className={className}>
        {page}
      </div>
    </div>
  );
}

export default QuizePage;
