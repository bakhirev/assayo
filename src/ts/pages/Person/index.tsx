import React from 'react';
import { useParams } from 'react-router-dom';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';

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

function Person() {
  const { type, page } = useParams<any>();
  if (type !== 'person') return null;
  return (
    <>
      {page !== 'week' && (
        <>
          <Title title={localization.get('common.filters')} />
          <UserSelect />
        </>
      )}
      {page === 'total' && <Total/>}
      {page === 'hours' && <Hours/>}
      {page === 'money' && <Money/>}
      {page === 'week' && <Week/>}
      {page === 'month' && <Month/>}
      {page === 'commits' && <Commits/>}
      {page === 'changes' && <Changes/>}
      {page === 'words' && <PopularWords/>}
      {page === 'speed' && <Speed/>}
      {page === 'day' && <Tempo/>}
    </>
  );
}

export default Person;
