import React from 'react';
import { useParams } from 'react-router-dom';

import Title from 'ts/components/Title';

import UserSelect from './components/UserSelect';
import Changes from './components/Changes';
import Commits from './components/Commits';
import Hours from './components/Hours';
import Money from './components/Money';
import PopularWords from './components/PopularWords';
import Speed from './components/Speed';
import Total from './components/Total';
import Week from './components/Week';
import Year from './components/Year';
import Tempo from './components/Tempo';

function Person() {
  const { type, page } = useParams<any>();
  if (type !== 'person') return null;
  return (
    <>
      {page !== 'week' && (
        <>
          <Title title="Фильтры"/>
          <UserSelect />
        </>
      )}

      {page === 'changes' && <Changes/>}
      {page === 'commits' && <Commits/>}
      {page === 'hours' && <Hours/>}
      {page === 'money' && <Money/>}
      {page === 'words' && <PopularWords/>}
      {page === 'speed' && <Speed/>}
      {page === 'total' && <Total/>}
      {page === 'month' && <Week/>}
      {page === 'week' && <Tempo/>}
      {page === 'year' && <Year/>}
    </>
  );
}

export default Person;
