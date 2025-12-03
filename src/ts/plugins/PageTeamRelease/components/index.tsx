import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import UiKitButton from 'ts/components/UiKit/components/Button';
import { Title, NothingFound } from 'ts/components/Layout';

import View from './components/View';
import saveChangeLog from './helpers';

import style from './index.module.scss';

const Release = observer(({
  mode,
}: ICommonPageProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const rows = dataGripStore.dataGrip.release.statistic;
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      {mode === 'print' ? (
        <Title title="sidebar.team.extension"/>
      ) : (
        <UiKitButton
          mode={['slim']}
          className={style.team_release_download}
          onClick={saveChangeLog}
        >
          {t('page.team.release.download')}
        </UiKitButton>
      )}
      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </FakeDataLoader>
    </>
  );
});

export default Release;
