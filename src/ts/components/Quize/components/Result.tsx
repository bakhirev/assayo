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
    <section className={stylePage.quize_result}>
      <h4 className={style.quize_title}>
        {result.title}
      </h4>
      <p className={style.quize_description}>
        {result.description}
      </p>
      <div className={style.quize_footer}>
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
