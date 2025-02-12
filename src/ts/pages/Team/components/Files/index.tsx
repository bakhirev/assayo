import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { IPaginationRequest } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import sendFakeRequest from 'ts/components/DataLoader/helpers/formatter';
import Title from 'ts/components/Title';
import NothingFound from 'ts/components/NothingFound';

import TreeFilters from './Filters';
import FileBreadcrumbs from './FileBreadcrumbs';
import View from './Table';
import { getContentByPath } from '../../helpers/tree';
import treeStore from '../../store/Tree';

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
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest) => sendFakeRequest({
            content, pagination: { ...pagination, size: 2000 },
          })}
          watch={`${treeStore.hash}${type}`}
        >
          <View />
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tree;
