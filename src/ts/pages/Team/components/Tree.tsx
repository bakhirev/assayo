import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

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
import NothingFound from 'ts/components/NothingFound';

import { getDate } from 'ts/helpers/formatter';

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
  const rewriteChart = getOptions({ order: [
    'page.team.tree.lineAdd',
    'page.team.tree.lineRemove',
  ], suffix: 'page.team.tree.line' });

  console.log(response.content);
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
        minWidth={200}
        onClick={(row: any) => {
          treeStore.updateFilter('selectedPath', row.path || []);
        }}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.firstCommitTime"
        formatter={(item: any) => getDate(item?.file?.firstCommit?.timestamp)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.author"
        formatter={(item: any) => item?.file?.firstCommit?.author || ''}
        width={150}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.lastCommitTime"
        formatter={(item: any) => getDate(item?.file?.lastCommit?.timestamp)}
        width={130}
      />
      <Column
        isSortable
        template={ColumnTypesEnum.STRING}
        title="page.team.pr.author"
        formatter={(item: any) => item?.file?.lastCommit?.author || ''}
        width={150}
      />
      <Column
        properties="file"
        minWidth={200}
        template={(file: any) => (
          <LineChart
            value={file ? 100 : 0}
            options={rewriteChart}
            details={{
              'page.team.tree.lineAdd': file?.lines || 0,
              'page.team.tree.lineRemove': (file?.total?.changes || 0) + (file?.total?.removed || 0),
            }}
          />
        )}
      />
      <Column
        title="page.team.tree.add"
        properties="file"
        minWidth={200}
        template={(file: any) => (
          <LineChart
            value={file?.total?.added ? 100 : 0}
            options={fileChart}
            details={getDetails(file, 'addedPercent')}
          />
        )}
      />
      <Column
        title="page.team.tree.change"
        properties="file"
        minWidth={200}
        template={(file: any) => (
          <LineChart
            value={file?.total?.changes ? 100 : 0}
            options={fileChart}
            details={getDetails(file, 'changesPercent')}
          />
        )}
      />
      <Column
        title="page.team.tree.remove"
        properties="file"
        minWidth={200}
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

interface ITreeProps {
  type?: string
}

const Tree = observer(({ type }: ITreeProps): React.ReactElement => {
  const { t } = useTranslation();
  const fileTree = type === 'removed'
    ? dataGripStore.removedFileTree
    : dataGripStore.fileTree;
  const subTree = getSubTreeByPath(fileTree, treeStore.selectedPath);
  const fileList = getArrayFromTree(subTree);
  console.dir(dataGripStore.removedFileTree);
  console.dir(fileList);

  // @ts-ignore
  if (!fileTree?.lines) return <NothingFound />;

  useEffect(() => {
    treeStore.updateFilter('selectedPath', []);
  }, [type]);

  return (
    <>
      <Title title={t('common.filters')} />
      <TreeFilters/>
      {false && treeStore.selectedPath?.join('/')}
      <Title title="page.team.tree.title"/>
      <PageWrapper template="table">
        <DataLoader
          to="response"
          loader={(pagination?: IPaginationRequest) => getFakeLoader({
            content: fileList, pagination: { ...pagination, size: 500 },
          })}
          watch={`${treeStore.hash}${type}`}
        >
          <TreeView />
          <Pagination />
        </DataLoader>
      </PageWrapper>
    </>
  );
});

export default Tree;
