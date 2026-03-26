import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import ICommit from 'ts/interfaces/Commit';
import statisticStore from 'ts/store/Statistics';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import { Title, NothingFound, Search as LayoutSearch, If } from 'ts/components/Layout';

import ServerView from './components/Server/View';
import ServiceView from './components/Service/View';
import EmailView from './components/Email/View';
import EmailPieCharts from './components/Email/PieCharts';

const EmailsPage = observer(({ mode }: PageOptions): React.ReactElement | null => {
  const servers = statisticStore.statisticsByCommits.server.totalInfo;
  const services = statisticStore.statisticsByCommits.service.totalInfo;
  const emails = statisticStore.statisticsByCommits.email.totalInfo;

  const [emailResults, setEmailResults] = useState<any>(emails);
  const [queryHash, setQueryHash] = useState<string>('');

  if (!servers?.length && !services?.length && !emails?.length) {
    return mode !== 'print' ? <NothingFound /> : null;
  }

  return (
    <>
      <If value={mode !== 'print'}>
        <Title title="common.filters"/>
        <LayoutSearch
          content={emails}
          elements={['search_small', 'company', 'author']}
          properties="email"
          onChange={(newResults: ICommit[], query: string) => {
            setEmailResults(newResults);
            setQueryHash(query);
          }}
        />
      </If>

      <If value={emailResults.length > 6}>
        <EmailPieCharts rows={emailResults} />
      </If>

      <Title title="plugin.team_emails.email.title"/>
      <FakeDataLoader
        content={emailResults}
        mode={mode}
        watch={`${mode}${queryHash}${statisticStore.hash}`}
      >
        <EmailView
          mode={mode}
          rowsForExcel={emailResults}
        />
        <NothingFound />
        <Pagination/>
      </FakeDataLoader>

      <If value={servers}>
        <Title title="plugin.team_emails.title"/>
        <FakeDataLoader
          content={servers}
          mode={mode}
          watch={`${mode}${statisticStore.hash}`}
        >
          <ServerView
            mode={mode}
            rowsForExcel={servers}
          />
          <Pagination/>
        </FakeDataLoader>
      </If>

      <If value={services}>
        <Title title="plugin.team_emails.service"/>
        <FakeDataLoader
          content={services}
          mode={mode}
          watch={`${mode}${statisticStore.hash}`}
        >
          <ServiceView
            mode={mode}
            rowsForExcel={services}
          />
          <Pagination/>
        </FakeDataLoader>
      </If>
    </>
  );
});

export default EmailsPage;
