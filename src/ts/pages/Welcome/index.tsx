import React from 'react';
import { Link } from 'react-router-dom';

import Console from './components/console';
import style from './styles/index.module.scss';

function Welcome() {
  return (
    <section className={`${style.welcome}`}>
      <div className={`${style.welcome_row}`}>
        <h2 className={`${style.welcome__title_1}`}>
          Выполните команду в корне вашего проекта
        </h2>
        <Console />
        <p className={`${style.welcome__description}`}>
          Git создаст файл dump.git.
          Он содержит данные для построения отчёта.
          Или git shortlog -s -n -e если отчёт вам не нужен.
          Советую добавить в проект файл
          <Link
            className={`${style.welcome__description_link}`}
             target="_blank"
             to="https://git-scm.com/docs/gitmailmap">
            .mailmap
          </Link>
          {', чтобы обьединить статистику по пользователям.'}
        </p>
        <h2 className={`${style.welcome__title_2}`}>
          Перетащите файл dump.git на эту страницу
        </h2>
      </div>
    </section>
  );
}

export default Welcome;
