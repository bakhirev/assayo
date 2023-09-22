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
import Month from './components/Month';
import Top from './components/Top';
import Pr from './components/PR';
import Print from './components/Print';

function Team() {
  const { type, page } = useParams<any>();

  if (type && type !== 'team') return null;
  if (!type) return (<Total/>);

  return (
    <>
      {page === 'total' && <Total/>}
      {page === 'scope' && <Scope/>}
      {page === 'author' && <Author/>}
      {page === 'type' && <Type/>}
      {page === 'pr' && <Pr/>}
      {page === 'day' && <Tempo/>}
      {page === 'week' && <Week/>}
      {page === 'month' && <Month/>}
      {page === 'hours' && <Hours/>}
      {page === 'tree' && <Tree/>}
      {page === 'commits' && <Commits/>}
      {page === 'changes' && <Changes/>}
      {page === 'words' && <PopularWords/>}
      {page === 'top' && <Top/>}
      {page === 'print' && <Print/>}
    </>
  );
}

export default Team;
