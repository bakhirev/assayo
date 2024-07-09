import React from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';

import IResult from '../interfaces/Result';

import stylePage from '../styles/result.module.scss';
import style from '../styles/index.module.scss';

interface IResultProps {
  result: IResult;
  onClick: Function;
}

function Result({
  result,
  onClick,
}: IResultProps): React.ReactElement | null {
  return (
    <section className={stylePage.quiz_result}>
      <h4 className={style.quiz_title}>
        {result.title}
      </h4>
      <p className={style.quiz_description}>
        {result.description}
      </p>
      <div className={style.quiz_footer}>
        <UiKitButton
          onClick={() => {
            onClick();
          }}
        >
          Replay
        </UiKitButton>
      </div>
    </section>
  );
}

export default Result;
