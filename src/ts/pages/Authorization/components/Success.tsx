import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore, { DataParseStatusEnum } from 'ts/store/DataGrip';
import DropZone from 'ts/components/DropZone';
import SplashScreen from 'ts/components/SplashScreen';
import Confirm from 'ts/components/ModalWindow/Confirm';

import PageWrapper from '../../PageWrapper';
import Team from '../../Team/index';
import Person from '../../Person/index';
import PrintAll from '../../PrintAll/index';
import Welcome from '../../Welcome/index';
import Settings from '../../Settings/index';
import DebugPage from '../../Debug/index';

interface IViewWithChartsProps {
  showSplashScreen: boolean;
}

function ViewWithCharts({ showSplashScreen }: IViewWithChartsProps) {
  return (
    <>
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
      {showSplashScreen && <SplashScreen />}
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

const Success = observer(() => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const status = dataGripStore.status;

  useEffect(() => {
    // @ts-ignore
    dataGripStore.setCommits(window?.report || []);
  }, []);

  if (status === DataParseStatusEnum.PROCESSING) return null;

  return (
    <>
      {status === DataParseStatusEnum.DONE && (
        <ViewWithCharts showSplashScreen={showSplashScreen} />
      )}
      {status === DataParseStatusEnum.WAITING && (
        <ViewWithWelcome />
      )}
      <DropZone
        onChange={(type: string, data: any[]) => {
          setShowSplashScreen(false);
          if (type === 'dump') dataGripStore.setCommits(data);
          setTimeout(() => {
            setShowSplashScreen(true);
          });
        }}
      />
    </>
  );
});

export default Success;
