import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
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

function ViewWithText() {
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

const Success = observer((): React.ReactElement => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const showChart = dataGripStore.showApplication;

  useEffect(() => {
    // @ts-ignore
    dataGripStore.setCommits(window?.report || []);
  }, []);

  return (
    <>
      {showChart && <ViewWithCharts showSplashScreen={showSplashScreen} />}
      {!showChart && <ViewWithText />}
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
