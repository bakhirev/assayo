import React from 'react';

import { If, Gap, Title } from 'ts/components/Layout';
import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import statisticStore from 'ts/store/Statistics';

import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import Cards from './Cards';
import EmailView from './Emails';
import CompaniesView from './Companies';
import SmallCards from './SmallCards';

function Total({ user, mode }: PageOptions): React.ReactElement {
  const allEmails = statisticStore.statisticsByCommits.email.totalInfo;
  const emails = allEmails.filter((email: any) => email.author === user.author);

  return (
    <>
      <Title title="plugin.person_total.title"/>
      <SmallCards user={user} />
      <Cards user={user} />

      <Gap height="xl"/>
      <If value={emails}>
        <Title title="plugin.person_total.email.title"/>
        <FakeDataLoader
          content={emails}
          mode={mode}
          watch={`${mode}${user.author}${statisticStore.hash}`}
        >
          <EmailView
            mode={mode}
            rowsForExcel={emails}
          />
          <Pagination/>
        </FakeDataLoader>
      </If>

      <If value={user.companies}>
        <Title title="plugin.person_total.company.title"/>
        <FakeDataLoader
          content={user.companies}
          mode={mode}
          watch={`${mode}${user.author}${statisticStore.hash}`}
        >
          <CompaniesView
            mode={mode}
            rowsForExcel={user.companies}
          />
          <Pagination/>
        </FakeDataLoader>
      </If>
    </>
  );
}

export default Total;
