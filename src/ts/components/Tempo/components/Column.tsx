import React from 'react';

import IHashMap from 'ts/interfaces/HashMap';
import ICommit from 'ts/interfaces/Commit';
import NothingFound from 'ts/components/NothingFound';

import Header from './Header';
import Author from './Author';
import Tasks from './Tasks';
import Chart from './Chart';
import style from '../styles/index.module.scss';

interface IColumnProps {
  dayInfo: any;
  order: string[];
  author?: string;
}

function Column({ dayInfo, order, author }: IColumnProps) {
  const authors = Object.entries(dayInfo?.tasksByAuthor || {})
    .sort((a: any, b: any) => (order.indexOf(a[0]) - order.indexOf(b[0])) )
    .filter(([name]) => author ? name === author : true)
    .map(([name, tasks]) => (
      <div
        key={name}
      >
        <Author name={name} />
        <Chart tasks={tasks as IHashMap<ICommit[]>} />
        <Tasks tasks={tasks as IHashMap<ICommit[]>} />
      </div>
    ));

  return (
    <div className={style.tempo_column}>
      <Header dayInfo={dayInfo} />
      <div className={style.tempo_column_wrapper}>
        {authors.length ? (
          authors
        ) : (
          <NothingFound
            icon="./assets/cards/commits.png"
            message="В этот день у этого пользователя не было ни одного коммита."
          />
        )}
      </div>
    </div>
  );
}

Column.defaultProps = {
  order: [],
  author: '',
};

export default Column;
