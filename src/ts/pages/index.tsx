import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import IHashMap from 'ts/interfaces/HashMap';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
import sourceData from 'ts/store/SourceData';
import viewNameStore, { ViewNameEnum } from 'ts/store/ViewName';
import DropZone from 'ts/components/DropZone';
import { SplashScreen, splashScreenStore } from 'ts/components/Layout';
import Confirm from 'ts/components/ModalWindow/Confirm';
import plugins from 'ts/helpers/Plugins';

import PageWrapper from './PageWrapper';
import Team from './Team/index';
import Person from './Person/index';
import Welcome from './Welcome/index';
import DebugPage from './Debug/index';

function ViewWithCharts() {
  return (
    <>
      <Confirm />
      <Routes>
        <Route
          path="/settings"
          element={(
            <PageWrapper>
              {plugins.getPage('/settings')}
            </PageWrapper>
          )}
        />
        <Route
          path="/debug"
          element={(
            <PageWrapper>
              <DebugPage />
            </PageWrapper>
          )}
        />
        <Route
          path="/print"
          element={(
            <PageWrapper>
              {plugins.getPage('/print')}
            </PageWrapper>
          )}
        />
        <Route
          path="/:type/:page"
          element={(
            <PageWrapper>
              <Team />
            </PageWrapper>
          )}
        />
        <Route
          path="/:type/:page/:userId"
          element={(
            <PageWrapper>
              <Person />
            </PageWrapper>
          )}
        />
        <Route
          path="*"
          element={(
            <PageWrapper>
              <Team />
            </PageWrapper>
          )}
        />
      </Routes>
    </>
  );
}

function ViewWithWelcome() {
  return (
    <Routes>
      <Route
        path="*"
        element={(
          <Welcome />
        )}
      />
    </Routes>
  );
}

let bugInReactWithDoubleInit = 1;
const Main = observer(() => {
  const view = viewNameStore.view;

  useEffect(() => {
    const gitLog = sourceData.get('gitLog');
    if (gitLog?.length && bugInReactWithDoubleInit !== gitLog?.length) {
      bugInReactWithDoubleInit = gitLog?.length;
      statisticStore.asyncSetCommits(gitLog);
    } else {
      viewNameStore.toggle(ViewNameEnum.WELCOME);
    }
  }, []);

  useEffect(() => { // @ts-ignore
    sourceData.add('gitLog', window.report); // @ts-ignore
  }, [window.report]);

  useEffect(() => {
    if (view !== ViewNameEnum.INFO || window.location.hash) return;
    window.location.hash = '#/team/total';
  }, [view]);

  if (view === ViewNameEnum.EMPTY) return null;

  return (
    <>
      {view === ViewNameEnum.WELCOME && (
        <ViewWithWelcome />
      )}
      {view === ViewNameEnum.INFO && (
        <ViewWithCharts />
      )}
      <SplashScreen />
      <DropZone onChange={(fileGroups: IHashMap<any>) => {
        sourceData.addGroups(fileGroups);
        if (fileGroups.gitLog) {
          splashScreenStore.setDelay(fileGroups.gitLog.length);
          statisticStore.asyncSetCommits(fileGroups.gitLog);
        }
      }}
      />
    </>
  );
});

export default Main;
