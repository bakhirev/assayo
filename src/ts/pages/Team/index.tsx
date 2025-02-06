import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import SectionSlider from 'ts/pages/PageWrapper/components/SectionSlider';
import printStore from 'ts/pages/PageWrapper/store/Print';
import fullScreen from 'ts/store/FullScreen';

import Author from './components/Author';
import Commits from './components/Commits';
import Company from './components/Company';
import Country from './components/Country';
import Changes from './components/Changes';
import Hours from './components/Hours';
import PopularWords from './components/PopularWords';
import Scope from './components/Scope';
import Tempo from './components/Tempo';
import Total from './components/Total';
import Files from './components/Files';
import FileAnalytics from './components/FileAnalytics';
import Type from './components/Type';
import Week from './components/Week';
import Month from './components/Month';
import Tasks from './components/Tasks';
import Building from './components/Building';
import Pr from './components/PR';
import Print from './components/Print';
import Release from './components/Release';
import Refactor from './components/Refactor';
import Department from './components/Department';
import RecommendationsPage from './components/Recommendations';

interface ViewProps {
  page?: string;
}

const View = observer(({ page }: ViewProps): React.ReactElement => {
  let mode = undefined;
  if (fullScreen.isOpen) mode = 'fullscreen';
  if (printStore.processing) mode = 'print';

  if (page === 'total') return <Total/>;
  if (page === 'scope') return <Scope mode={mode}/>;
  if (page === 'author') return <Author mode={mode}/>;
  if (page === 'company') return <Company mode={mode}/>;
  if (page === 'country') return <Country mode={mode}/>;
  if (page === 'type') return <Type mode={mode}/>;
  if (page === 'pr') return <Pr mode={mode}/>;
  if (page === 'day') return <Tempo/>;
  if (page === 'week') return <Week mode={mode}/>;
  if (page === 'month') return <Month mode={mode}/>;
  if (page === 'hours') return <Hours mode={mode}/>;
  if (page === 'files') return <Files/>;
  if (page === 'removedFiles') return <Files type="removed" />;
  if (page === 'extension') return <FileAnalytics mode={mode}/>;
  if (page === 'release') return <Release mode={mode}/>;
  if (page === 'commits') return <Commits/>;
  if (page === 'changes') return <Changes/>;
  if (page === 'words') return <PopularWords mode={mode}/>;
  if (page === 'building') return <Building/>;
  if (page === 'print') return <Print/>;
  if (page === 'tasks') return <Tasks/>;
  if (page === 'refactor') return <Refactor/>;
  if (page === 'department') return <Department/>;
  if (page === 'recommendations') return <RecommendationsPage/>;
  return <Total/>;
});

export default function Team() {
  const { type } = useParams<any>();
  if (type && type !== 'team') return null;

  return <SectionSlider getViewById={(page: string) => <View page={page} />} />;
}
