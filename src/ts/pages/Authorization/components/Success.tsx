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
import Welcome from '../../Welcome/index';
import Settings from '../../Settings/index';

const Success = observer((): React.ReactElement => {
  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);

  useEffect(() => {
    // @ts-ignore
    dataGripStore.setCommits(window?.report || []);
  }, []);

  const dropArea = (
    <DropZone
      onChange={(type: string, data: any[]) => {
        setShowSplashScreen(false);
        if (type === 'dump') dataGripStore.setCommits(data);
        if (type === 'telegramm') dataGripStore.setTelegrammMessages(data);
        setTimeout(() => {
          setShowSplashScreen(true);
        });
      }}
    />
  );

  return dataGripStore.showApplication ? (
      <>
        <Confirm />
        {dropArea}
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
  ) : (
    <>
      {dropArea}
      <Routes>
        <Route
          path="*"
          element={(
            <Welcome />
          )}
        />
      </Routes>
    </>
  );
});

export default Success;
