import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import UiKitSelect from 'ts/components/UiKit/components/Select';
import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';

import treeStore from '../store/Tree';
import style from '../styles/filters.module.scss';

const TreeFilters = observer((): React.ReactElement => {
  const authors = dataGripStore.dataGrip.author.list;
  const options = authors.map((title: string, id: number) => ({ id, title }));
  options.unshift({ id: 0, title: 'Все сотрудники' });

  return (
    <>
      <UiKitSelect
        title="Сотрудник"
        value={treeStore.authorId}
        options={options}
        className={style.filter}
        onChange={(authorId: number) => {
          treeStore.updateFilter('authorId', authorId);
        }}
      />
      <UiKitInputNumber
        title="Количество коммитов"
        help="Минимальное количество коммитов, которое сделал сотрудник в файле"
        value={treeStore.minCommits}
        className={style.filter}
        onChange={(minCommits: number) => {
          treeStore.updateFilter('minCommits', minCommits);
        }}
      />
    </>
  );
});

export default TreeFilters;
