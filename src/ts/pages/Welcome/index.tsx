import React from 'react';
import { Link } from 'react-router-dom';

import Console from 'ts/components/Console';
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
  const command = 'git --no-pager log --numstat --oneline --all --reverse --date=iso-strict --pretty=format:"%ad>%cN>%cE>%s" > log.txt\n';
  return (
    <>
      {true && (<WarningInfo />)}
      <section className={style.welcome}>
        <div className={style.welcome_row}>
          <h2 className={style.welcome_first_title}>
            Выполните команду в корне вашего проекта
          </h2>
          <Console
            className={style.welcome_console}
            textForCopy={command}
          />
          <p className={style.welcome_description}>
            Git создаст файл log.txt.
            Он содержит данные для построения отчёта.
            Или git shortlog -s -n -e если отчёт вам не нужен.
            Создайте файл
            <Link
              className={`${style.welcome_link}`}
              target="_blank"
              to="https://git-scm.com/docs/gitmailmap">
              .mailmap
            </Link>
            {' в корне проекта, чтобы обьединить статистику по сотрудникам.'}
          </p>
          <h2 className={style.welcome_last_title}>
            Перетащите файл log.txt на эту страницу
          </h2>
        </div>
      </section>
    </>
  );
}

export default Welcome;
