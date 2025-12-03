import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { IPaginationRequest } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import { DataLoader, Pagination, sendFakeRequest } from 'ts/components/DataLoader';
import { Title, NothingFound, SectionWithBg } from 'ts/components/Layout';

import TreeFilters from './Filters';
import FileBreadcrumbs from './FileBreadcrumbs';
import View from './Table';
import { getContentByPath } from '../helpers';
import treeStore from '../store';

interface ITreeProps {
  type?: string
}

const Tree = observer(({ type }: ITreeProps): React.ReactElement => {
  const { t } = useTranslation();
  const fileTree = type === 'removed'
    ? dataGripStore.fileGrip.removedTree.tree
    : dataGripStore.fileGrip.tree.tree;

  useEffect(() => {
    treeStore.updateFilter('selectedPath', []);
  }, [type]);

  const content = getContentByPath(fileTree, treeStore.selectedPath);
  if (!content?.length) {
    return <NothingFound />;
  }

  return (
    <>
      <Title title={t('common.filters')} />
      <TreeFilters/>
      <FileBreadcrumbs />
      <SectionWithBg>
        <DataLoader
          loader={(pagination?: IPaginationRequest) => sendFakeRequest({
            content, pagination: { ...pagination, size: 2000 },
          })}
          watch={`${treeStore.hash}${type}`}
        >
          <View />
          <Pagination />
        </DataLoader>
      </SectionWithBg>
    </>
  );
});

export default Tree;
