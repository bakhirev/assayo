import React from 'react';

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
  const className = [style.quize_answer_wrapper];
  const textClasName = [style.quize_answer_text];

  if (mode === 'small' || mode === 'error') className.push(style.quize_answer_wrapper_small);
  if (mode === 'selected') textClasName.push(style.quize_answer_text_selected);
  if (mode === 'correct') textClasName.push(style.quize_answer_text_correct);
  if (mode === 'error') textClasName.push(style.quize_answer_text_error);

  return (
    <div className={className.join(' ')}>
      <figure
        className={style.quize_answer}
        onClick={() => {
          onClick();
        }}
      >
        <img
          className={style.quize_answer_icon}
          src="./assets/games/quize/balloon.png"
        />
        <figcaption className={textClasName.join(' ')}>
          {answer.title}
        </figcaption>
      </figure>
    </div>
  );
}

export default Answer;
