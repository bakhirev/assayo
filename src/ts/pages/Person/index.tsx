import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';
import dataGripStore from 'ts/store/DataGrip';

import UserSelect from './components/UserSelect';
import Changes from './components/Changes';
import Commits from './components/Commits';
import Hours from './components/Hours';
import Money from './components/Money';
import PopularWords from './components/PopularWords';
import Speed from './components/Speed';
import Total from './components/Total';
import Week from './components/Week';
import Month from './components/Month';
import Tempo from './components/Tempo';
import Print from './components/Print';

interface IPersonProps {
  userId?: string | number;
}

const Person = observer(({
  userId,
}: IPersonProps) => {
  const { type, page, userId: userIdFromUrl } = useParams<any>();
  const user = dataGripStore.dataGrip.author.statistic[userId || userIdFromUrl || 0];
  if (type !== 'person' || !user) return null;

  return (
    <>
      {!['print'].includes(page || '') && (
        <>
          <Title title={localization.get('common.filters')} />
          <UserSelect />
        </>
      )}
      {page === 'total' && <Total user={user}/>}
      {page === 'hours' && <Hours user={user}/>}
      {page === 'money' && <Money user={user}/>}
      {page === 'week' && <Week user={user}/>}
      {page === 'month' && <Month user={user}/>}
      {page === 'commits' && <Commits user={user}/>}
      {page === 'changes' && <Changes user={user}/>}
      {page === 'words' && <PopularWords user={user}/>}
      {page === 'speed' && <Speed user={user}/>}
      {page === 'day' && <Tempo user={user}/>}
      {page === 'print' && <Print user={user}/>}
    </>
  );
});

export default Person;
