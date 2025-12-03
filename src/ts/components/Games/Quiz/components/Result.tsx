import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <section className={stylePage.quiz_result}>
      <h4 className={style.quiz_title}>
        {t(result.title || '')}
      </h4>
      <p className={style.quiz_description}>
        {t(result.description || '')}
      </p>
      <div className={style.quiz_footer}>
        <UiKitButton
          mode="second"
          onClick={() => {
            onClick();
          }}
        >
          {t('page.team.building.quiz.replay')}
        </UiKitButton>
      </div>
    </section>
  );
}

export default Result;
