import React from 'react';
import { observer } from 'mobx-react-lite';

import { IPaginationRequest, IPagination } from 'ts/interfaces/Pagination';
import dataGripStore from 'ts/store/DataGrip';

import PageWrapper from 'ts/components/Page/wrapper';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import getFakeLoader from 'ts/components/DataLoader/helpers/formatter';
import Title from 'ts/components/Title';
import Table from 'ts/components/Table';
import Column from 'ts/components/Table/components/Column';
import { ColumnTypesEnum } from 'ts/components/Table/interfaces/Column';
import LineChart from 'ts/components/LineChart';
import getOptions from 'ts/components/LineChart/helpers/getOptions';

import TreeFilters from './TreeFilters';
import { getSubTreeByPath, getArrayFromTree } from '../helpers/tree';
import treeStore from '../store/Tree';

interface ITreeViewProps {
  response?: IPagination<any>;
}

function TreeView({ response }: ITreeViewProps) {
  if (!response) return null;

  const getDetails = (file: any, property: string) => {
    if (!file) return {};
    return Object.keys(file.authors || {})
      .reduce((details: any, name: any) => {
        details[name] = file.authors[name][property];
        return details;
      }, {});
  };

  const fileChart = getOptions({ order: dataGripStore.dataGrip.author.list, suffix: 'строк' });
  const rewriteChart = getOptions({ order: ['добавили', 'изменили'], suffix: 'строк' });

  return (
    <Table
      rows={response.content}
      disabledRow={(row: any) => {
        if (row?.title === '..') return false;
        const limit = treeStore.minCommits || 0;
        const name = dataGripStore.dataGrip.author.list[treeStore.authorId || ''] || '';
        const author = row.file?.authors[name];
        const commits = author?.commits || 0;
        return (treeStore.authorId && !author) || (commits < limit);
      }}
    >
      <Column
        isFixed
        template={ColumnTypesEnum.STRING}
        properties="title"
        width={200}
        onClick={(row: any) => {
          treeStore.updateFilter('selectedPath', row.path || []);
        }}
      />
      <Column
        title="Процент перезаписи строк"
        properties="file"
        width={250}
        template={(file: any) => (
          <LineChart
            value={file ? 100 : 0}
            options={rewriteChart}
            details={{
              'добавили': file?.lines || 0,
              'изменили': (file?.total?.changes || 0) + (file?.total?.removed || 0),
            }}
          />
        )}
      />
      <Column
        title="Кто добавлял"
        properties="file"
        width={200}
        template={(file: any) => (
          <LineChart
            value={file?.total?.added ? 100 : 0}
            options={fileChart}
            details={getDetails(file, 'addedPercent')}
          />
        )}
      />
      <Column
        title="Кто менял"
        properties="file"
        width={200}
        template={(file: any) => (
          <LineChart
            value={file?.total?.changes ? 100 : 0}
            options={fileChart}
            details={getDetails(file, 'changesPercent')}
          />
        )}
      />
      <Column
        title="Кто удалял"
        properties="file"
        width={200}
        template={(file: any) => (
          <LineChart
            value={file?.total?.removed ? 100 : 0}
            options={fileChart}
            details={getDetails(file, 'removedPercent')}
          />
        )}
      />
    </Table>
  );
}

TreeView.defaultProps = {
  response: undefined,
};

const Tree = observer((): React.ReactElement => {
  const fileTree = dataGripStore.fileTree;
  const subTree = getSubTreeByPath(fileTree, treeStore.selectedPath);
  const fileList = getArrayFromTree(subTree);

  return (
    <>
      <Title title="Фильтры"/>
      <TreeFilters/>
      <Title title="Дерево проекта с учётом выбранных фильтров"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest) => getFakeLoader(fileList, { ...pagination, size: 500 })}
          watch={treeStore.hash}
        >
          <TreeView />
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tree;
