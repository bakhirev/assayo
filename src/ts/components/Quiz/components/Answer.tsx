import React, { useState } from 'react';

import { getRandom } from 'ts/helpers/random';

import IAnswer from '../interfaces/Answer';
import style from '../styles/answer.module.scss';

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
  const [iconIndex] = useState(getRandom(5));
  const className = [style.quiz_answer_wrapper];
  const textClasName = [style.quiz_answer_text];

  if (mode === 'small' || mode === 'error') className.push(style.quiz_answer_wrapper_small);
  if (mode === 'selected') textClasName.push(style.quiz_answer_text_selected);
  if (mode === 'correct') textClasName.push(style.quiz_answer_text_correct);
  if (mode === 'error') textClasName.push(style.quiz_answer_text_error);

  return (
    <div className={className.join(' ')}>
      <figure
        className={style.quiz_answer}
        onClick={() => {
          onClick();
        }}
      >
        <img
          className={style.quiz_answer_icon}
          src={`./assets/games/quize/balloon_${iconIndex}.png`}
        />
        <figcaption className={textClasName.join(' ')}>
          {answer.title}
        </figcaption>
      </figure>
    </div>
  );
}

export default Answer;
