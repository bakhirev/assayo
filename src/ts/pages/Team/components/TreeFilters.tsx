import React from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import UiKitSelect from 'ts/components/UiKit/components/SelectWithButtons';
import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import localization from 'ts/helpers/Localization';

import treeStore from '../store/Tree';
import style from '../styles/filters.module.scss';

const TreeFilters = observer((): React.ReactElement => {
  const authors = dataGripStore.dataGrip.author.list;
  const options = authors.map((title: string, id: number) => ({ id: id + 1, title }));
  options.unshift({ id: 0, title: localization.get('page.team.tree.filters.all') });

  return (
    <>
      <UiKitSelect
        title="page.team.tree.filters.author"
        value={treeStore.authorId}
        options={options}
        className={style.filter}
        onChange={(authorId: number) => {
          treeStore.updateFilter('authorId', authorId);
        }}
      />
      <UiKitInputNumber
        title="page.team.tree.filters.commits"
        help="page.team.tree.filters.help"
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
