import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import dataGripStore from 'ts/store/DataGrip';

import ICommonPageProps from 'ts/components/Page/interfaces/CommonPageProps';
import DataLoader from 'ts/components/DataLoader';
import Pagination from 'ts/components/DataLoader/components/Pagination';
import { getFakeLoader } from 'ts/components/DataLoader/helpers/formatter';
import UiKitButton from 'ts/components/UiKit/components/Button';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';

import View from './View';
import saveChangeLog from './saveChangeLog';

import style from '../../styles/release.module.scss';

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
      <DataLoader
        to="response"
        loader={getFakeLoader(rows, mode)}
        watch={`${mode}${dataGripStore.hash}`}
      >
        <View
          mode={mode}
          rowsForExcel={rows}
        />
        <Pagination />
      </DataLoader>
    </>
  );
});

export default Release;
