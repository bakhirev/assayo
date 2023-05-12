import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import DropZone from 'ts/components/DropZone';
import Confirm from 'ts/components/ModalWindow/Confirm';

import PageWrapper from '../../PageWrapper';
import Main from '../../Main/index';
import Team from '../../Team/index';
import Person from '../../Person/index';
import Welcome from '../../Welcome/index';
import Settings from '../../Settings/index';

const Success = observer((): React.ReactElement => {
  useEffect(() => {
    // @ts-ignore
    dataGripStore.setCommits(window?.report || []);
  }, []);

  const dropArea = (
    <DropZone
      onChange={(type: string, data: any[]) => {
        if (type === 'dump') dataGripStore.setCommits(data);
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
              <Main />
            )}
          />
        </Routes>
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
