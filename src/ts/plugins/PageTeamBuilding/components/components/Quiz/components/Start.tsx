import React from 'react';
import { useTranslation } from 'ts/components/Translation';

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
  const { t } = useTranslation();
  return (
    <section className={stylePage.quiz_start}>
      <h4 className={style.quiz_title}>
        {t(quiz.title || '')}
      </h4>
      <p className={style.quiz_description}>
        {t(quiz.description || '')}
      </p>
      <div className={style.quiz_footer}>
        <UiKitButton
          mode="second"
          onClick={() => {
            onClick();
          }}
        >
          {t('plugin.team_building.quiz.start')}
        </UiKitButton>
      </div>
    </section>
  );
}

export default Start;
