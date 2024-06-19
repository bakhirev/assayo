import React from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';

import IQuize from '../interfaces/Quize';

import stylePage from '../styles/start.module.scss';
import style from '../styles/index.module.scss';

interface IStartProps {
  quize: IQuize;
  onClick: Function;
}

function Start({
  quize,
  onClick,
}: IStartProps): React.ReactElement | null {
  return (
    <section className={stylePage.quize_start}>
      <h4 className={style.quize_title}>
        {quize.title}
      </h4>
      <img
        className={style.quize_icon}
        style={{ backgroundImage: `url(${quize.icon})` }}
        src="./assets/games/4x3.png"
      />
      <p className={style.quize_description}>
        {quize.description}
      </p>
      <div className={style.quize_footer}>
        <UiKitButton
          onClick={() => {
            onClick();
          }}
        >
          {quize.button || 'GO'}
        </UiKitButton>
      </div>
    </section>
  );
}

export default Start;
