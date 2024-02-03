import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import printStore from 'ts/pages/PageWrapper/store/Print';

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

const Team = observer((): React.ReactElement | null => {
  const { type, page } = useParams<any>();

  if (type && type !== 'team') return null;
  if (!type) return (<Total/>);

  const mode = printStore.processing ? 'print' : undefined;

  return (
    <>
      {page === 'total' && <Total/>}
      {page === 'scope' && <Scope mode={mode}/>}
      {page === 'author' && <Author mode={mode}/>}
      {page === 'type' && <Type mode={mode}/>}
      {page === 'pr' && <Pr mode={mode}/>}
      {page === 'day' && <Tempo/>}
      {page === 'week' && <Week mode={mode}/>}
      {page === 'month' && <Month mode={mode}/>}
      {page === 'hours' && <Hours mode={mode}/>}
      {page === 'tree' && <Tree/>}
      {page === 'commits' && <Commits/>}
      {page === 'changes' && <Changes/>}
      {page === 'words' && <PopularWords mode={mode}/>}
      {page === 'top' && <Top/>}
      {page === 'print' && <Print/>}
    </>
  );
});

export default Team;
