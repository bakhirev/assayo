import React from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';

import IQuiz from '../interfaces/Quiz';

import stylePage from '../styles/start.module.scss';
import style from '../styles/index.module.scss';

interface IStartProps {
  quiz: IQuiz;
  onClick: Function;
}

function Start({
  quiz,
  onClick,
}: IStartProps): React.ReactElement | null {
  return (
    <section className={stylePage.quiz_start}>
      <h4 className={style.quiz_title}>
        {quiz.title}
      </h4>
      <p className={style.quiz_description}>
        {quiz.description}
      </p>
      <div className={style.quiz_footer}>
        <UiKitButton
          onClick={() => {
            onClick();
          }}
        >
          {quiz.button || 'GO'}
        </UiKitButton>
      </div>
    </section>
  );
}

export default Start;
