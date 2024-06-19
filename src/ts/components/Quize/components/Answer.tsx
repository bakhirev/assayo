import React from 'react';

import IAnswer from '../interfaces/Answer';
import style from '../styles/answer.module.scss';

const IS_WRAPPER_MODE = {
  error: true,
  small: true,
};

interface IAnswerProps {
  answer: IAnswer;
  mode: string;
  onClick: Function;
}

function Answer({
  answer,
  mode,
  onClick,
}: IAnswerProps): React.ReactElement | null {
  const className = [style.quize_answer];
  if (mode === 'selected') className.push(style.quize_answer_selected);
  if (mode === 'correct') className.push(style.quize_answer_correct);
  if (mode === 'error') className.push(style.quize_answer_error);
  if (mode === 'small') className.push(style.quize_answer_small);

  const wrapperClass = [style.quize_answer_wrapper];
  if (IS_WRAPPER_MODE[mode]) wrapperClass.push(style.quize_answer_wrapper_small);

  return (
    <div className={wrapperClass.join(' ')}>
      <figure
        className={className.join(' ')}
        onClick={() => {
          onClick();
        }}
      >
        <img
          className={style.quize_answer_icon}
          src={answer.icon}
        />
        <figcaption className={style.quize_answer_text}>
          {answer.title}
        </figcaption>
      </figure>
    </div>
  );
}

export default Answer;
