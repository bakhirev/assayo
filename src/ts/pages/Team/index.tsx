import React from 'react';
import { useParams } from 'react-router-dom';

import SectionSlider from 'ts/pages/PageWrapper/components/SectionSlider';
import printStore from 'ts/pages/PageWrapper/store/Print';

import Author from './components/Author';
import Commits from './components/Commits';
import Changes from './components/Changes';
import Hours from './components/Hours';
import PopularWords from './components/PopularWords';
import Scope from './components/Scope';
import Tempo from './components/Tempo';
import Total from './components/Total';
import Files from './components/Files';
import FileAnalitics from './components/FileAnalitics';
import Type from './components/Type';
import Week from './components/Week';
import Month from './components/Month';
import Tasks from './components/Tasks';
import TeamBuilding from './components/Top';
import Pr from './components/PR';
import Print from './components/Print';
import Release from './components/Release';

function getViewById(page?: string) {
  const mode = printStore.processing ? 'print' : undefined;
  if (page === 'total') return <Total/>;
  if (page === 'scope') return <Scope mode={mode}/>;
  if (page === 'author') return <Author mode={mode}/>;
  if (page === 'type') return <Type mode={mode}/>;
  if (page === 'pr') return <Pr mode={mode}/>;
  if (page === 'day') return <Tempo/>;
  if (page === 'week') return <Week mode={mode}/>;
  if (page === 'month') return <Month mode={mode}/>;
  if (page === 'hours') return <Hours mode={mode}/>;
  if (page === 'files') return <Files/>;
  if (page === 'removedFiles') return <Files type="removed" />;
  if (page === 'extension') return <FileAnalitics mode={mode}/>;
  if (page === 'release') return <Release mode={mode}/>;
  if (page === 'commits') return <Commits/>;
  if (page === 'changes') return <Changes/>;
  if (page === 'words') return <PopularWords mode={mode}/>;
  if (page === 'building') return <TeamBuilding/>;
  if (page === 'print') return <Print/>;
  if (page === 'tasks') return <Tasks/>;
  return <Total/>;
}

export default function Team() {
  const { type } = useParams<any>();
  if (type && type !== 'team') return null;

  return <SectionSlider getViewById={getViewById} />;
}
