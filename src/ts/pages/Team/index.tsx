import React from 'react';
import { useParams } from 'react-router-dom';

import Author from './components/Author';
import Commits from './components/Commits';
import Changes from './components/Changes';
import Hours from './components/Hours';
import PopularWords from './components/PopularWords';
import Scope from './components/Scope';
import Tempo from './components/Tempo';
import Total from './components/Total';
import Tree from './components/Tree';
import Type from './components/Type';
import Week from './components/Week';
import Year from './components/Year';

function Team() {
  const { type, page } = useParams<any>();

  if (type && type !== 'team') return null;
  if (!type) return (<Total/>);

  return (
    <>
      {page === 'author' && <Author/>}
      {page === 'changes' && <Changes/>}
      {page === 'timestamp' && <Commits/>}
      {page === 'hours' && <Hours/>}
      {page === 'words' && <PopularWords/>}
      {page === 'scope' && <Scope/>}
      {page === 'month' && <Week/>}
      {page === 'year' && <Year/>}
      {page === 'total' && <Total/>}
      {page === 'tree' && <Tree/>}
      {page === 'type' && <Type/>}
      {page === 'sprint' && <Tempo/>}
    </>
  );
}

export default Team;
