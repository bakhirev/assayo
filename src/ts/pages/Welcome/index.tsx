import React from 'react';
import { Link } from 'react-router-dom';

import Console from 'ts/components/Console';
import localization from 'ts/helpers/Localization';
import Description from 'ts/components/Description';

import style from './styles/index.module.scss';

function WarningInfo() {
  return (
    <h4 className={style.welcome_warning}>
      <p>
        {'Сервис '}
        <span className={style.welcome_warning_bold}>НЕ ХРАНИТ</span>
        {' и '}
        <span className={style.welcome_warning_bold}>НЕ ПЕРЕДАЁТ</span>
        {' ваши данные. Все расчёты выполняются локально в вашем браузере прямо на вашей машине.'}
      </p>
      <p>
        {'Сервис '}
        <span className={style.welcome_warning_bold}>НЕ СОБИРАЕТ СТАТИСТИКУ</span>
        {' по проектам. Вы можете отключить интернет, проверить трафик и даже собрать локальный билд из '}
        <a
          href='https://github.com/bakhirev/assayo'
          target="_blank"
          rel="noreferrer"
          className={style.welcome_warning_link}
        >
          исходников
        </a>
        {'.'}
      </p>
    </h4>
  );
}

function Welcome() {
  const canShowWarning = true;
  const command = 'git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt\n';
  return (
    <>
      {canShowWarning && (<WarningInfo />)}
      <section className={style.welcome}>
        <div className={style.welcome_row}>
          <h2 className={style.welcome_first_title}>
            {localization.get('page.welcome.step1')}
          </h2>
          <Console
            className={style.welcome_console}
            textForCopy={command}
          />
          <p className={style.welcome_description}>
            {localization.get('page.welcome.description1')}
            <Link
              className={`${style.welcome_link}`}
              target="_blank"
              to="https://git-scm.com/docs/gitmailmap">
              .mailmap
            </Link>
            {localization.get('page.welcome.description2')}
          </p>
          <h2 className={style.welcome_last_title}>
            {localization.get('page.welcome.step2')}
          </h2>
        </div>
      </section>
    </>
  );
}

export default Welcome;
