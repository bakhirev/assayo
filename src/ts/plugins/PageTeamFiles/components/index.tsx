import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { IPaginationRequest } from 'ts/interfaces/Pagination';
import statisticStore from 'ts/store/Statistics';

import { DataLoader, Pagination, sendFakeRequest } from 'ts/components/DataLoader';
import { If, Title, NothingFound, SectionWithBg, Search as LayoutSearch } from 'ts/components/Layout';
import Filter from 'ts/components/Layout/Search/interfaces/Filter';

import Filters from './components/Filters';
import FileBreadcrumbs from './components/FileBreadcrumbs';
import View from './components/View/index';
import { getContentByPath } from './helpers';

type TreeProps = PageOptions & {
  type?: string;
};

const Tree = observer(({ type, mode }: TreeProps): React.ReactElement => {
  const [path, setPath] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter>({});
  const fileTree = type === 'removed'
    ? statisticStore.statisticsByFiles.removedTree.tree
    : statisticStore.statisticsByFiles.tree.tree;

  useEffect(() => {
    setPath([]);
  }, [type]);

  const content = getContentByPath(fileTree, path);
  if (!content?.length) {
    return <NothingFound />;
  }

  return (
    <>
      <If value={mode !== 'print'}>
        <Title title="common.filters" />
        <LayoutSearch
          elements={['company', 'taskCode', 'author', 'type', 'scope']}
          onChange={(results: any[], hash: string, newFilters: Filter) => {
            setFilters(newFilters);
          }}
        >
          <Filters/>
        </LayoutSearch>
      </If>
      <FileBreadcrumbs
        path={path}
        setPath={setPath}
      />
      <SectionWithBg>
        <DataLoader
          loader={(pagination?: IPaginationRequest) => sendFakeRequest({
            content, pagination: { ...pagination, size: 2000 },
          })}
          watch={`${path}${filters.hash}${type}`}
        >
          <View
            filters={filters}
            setPath={setPath}
          />
          <Pagination />
        </DataLoader>
      </SectionWithBg>
    </>
  );
});

export default Tree;
