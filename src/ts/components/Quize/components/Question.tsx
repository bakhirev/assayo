import React, { useEffect, useState } from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';

import IQuestion from '../interfaces/Question';
import IAnswer from '../interfaces/Answer';
import Progress from './Progress';
import Answer from './Answer';

import stylePage from '../styles/question.module.scss';
import style from '../styles/index.module.scss';

function getModes(answers: IAnswer[], selected: IAnswer | null) {
  return (answers || []).map((answer: IAnswer) => {
    if (answer?.score) return 'correct';
    if (!answer?.score && answer === selected) return 'error';
    return 'small';
  });
}

interface IQuestionProps {
  question: IQuestion;
  progress: number;
  onClick: Function;
}

function Question({
  question,
  progress,
  onClick,
}: IQuestionProps): React.ReactElement | null {
  const [selected, setSelected] = useState<IAnswer | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [mode, setMode] = useState<string[]>([]);
  const formattedAnswers = question.answers || [];

  useEffect(() => {
    setMode([]);
    setSelected(null);
    setDisabled(false);
  }, [question]);

  if (!question) return null;

  const answers = formattedAnswers.map((item: IAnswer, index: number) => (
    <Answer
      key={`${item.id || ''}|${item.title}`}
      mode={mode[index]}
      answer={item}
      onClick={() => {
        if (disabled) return;

        if (selected !== item) {
          const newModes = [];
          newModes[index] = 'selected';
          setMode(newModes);
          setSelected(item);
          return;
        }

        setDisabled(true);
        setTimeout(() => {
          setMode(getModes(formattedAnswers, selected));
        }, 1000);
        setTimeout(() => {
          onClick(selected);
        }, 3000);
      }}
    />
  ));

  return (
    <div className={stylePage.quize_question}>
      <Progress progress={progress}/>
      <div className={stylePage.quize_question_body}>
        <div className={style.quize_title}>
          {question.title}
        </div>
        <div className={style.quize_question_answer}>
          {answers}
        </div>
        <div className={style.quize_footer}>
          <UiKitButton
            disabled={disabled}
            onClick={() => {
              setDisabled(true);
              setTimeout(() => {
                setMode(getModes(formattedAnswers, selected));
              }, 1000);
              setTimeout(() => {
                onClick(selected);
              }, 3000);
            }}
          >
            {question.button || 'Next question'}
          </UiKitButton>
        </div>
      </div>
    </div>
  );
}

export default Question;
