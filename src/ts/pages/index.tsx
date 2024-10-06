import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import viewNameStore, { ViewNameEnum } from 'ts/store/ViewName';
import DropZone from 'ts/components/DropZone';
import Sponsor from 'ts/components/Sponsor';
import SplashScreen from 'ts/components/SplashScreen';
import Confirm from 'ts/components/ModalWindow/Confirm';

import PageWrapper from './PageWrapper';
import Team from './Team/index';
import Person from './Person/index';
import PrintAll from './PrintAll/index';
import Welcome from './Welcome/index';
import Settings from './Settings/index';
import DebugPage from './Debug/index';

function ViewWithCharts() {
  return (
    <>
      <Sponsor />
      <Confirm />
      <Routes>
        <Route
          path="/settings"
          element={(
            <PageWrapper>
              <Settings />
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
              <PrintAll />
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
    // @ts-ignore
    const list = window?.report || [];
    if (list?.length && bugInReactWithDoubleInit !== list?.length) {
      bugInReactWithDoubleInit = list?.length;
      dataGripStore.asyncSetCommits(list);
    } else {
      viewNameStore.toggle(ViewNameEnum.WELCOME);
    }
  }, []);

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
      <DropZone
        onChange={(type: string, data: any[]) => {
          if (type !== 'dump') return;
          dataGripStore.asyncSetCommits(data);
        }}
      />
    </>
  );
});

export default Main;
