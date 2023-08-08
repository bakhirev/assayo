import React from 'react';
import { useParams } from 'react-router-dom';

import style from '../../styles/header.module.scss';

const TITLES = {
  team: {
    total: 'Общая информация',
    sprint: 'Динамика работы в течении недели',
    month: 'Список задач за месяц',
    scope: 'Оценка проекта',
    author: 'Оценка сотрудников',
    type: 'Типы задач и их оценка',
    tree: 'Анализ файлов',
    year: 'График работы',
    hours: 'Распределение коммитов в течении каждого дня недели',
    commits: 'Количество коммитов',
    changes: 'Все изменения',
    timestamp: 'Все коммиты',
    week: 'Распределение коммитов по дням недели',
    words: 'Популярные слова в комментарии к коммиту',
    top: 'Викторина',
    settings: 'Настройки',
  },
  person: {
    total: 'Общая информация',
    speed: 'Скорость работы',
    money: 'Стоимость работы',
    week: 'Динамика работы в течении недели',
    month: 'Список задач за месяц',
    frequency: 'График работы',
    hours: 'Распределение коммитов в течении каждого дня недели',
    absolute: 'Распределение коммитов по дням недели',
    commits: 'Все коммиты',
    changes: 'Все изменения',
    words: 'Популярные слова в комментарии к коммиту',
    settings: 'Настройки',
  },
};

function Logo() {
  const { type, page } = useParams<any>();
  return (
    <h2 className={style.header_title}>
      {TITLES[type || '']?.[page || ''] || 'Настройки'}
    </h2>
  );
}

export default Logo;
