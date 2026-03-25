import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'ts/components/Translation';

import statisticStore from 'ts/store/Statistics';

import { PageOptions } from 'ts/helpers/Plugins/interfaces/Plugin';
import { FakeDataLoader, Pagination } from 'ts/components/DataLoader';
import UiKitButton from 'ts/components/UiKit/components/Button';
import { Title, NothingFound, If } from 'ts/components/Layout';

import Chart from './components/Chart';
import View from './components/View';
import saveReleaseNote from './helpers/saveReleaseNote';

import style from './index.module.scss';

const Release = observer(({
  mode,
}: PageOptions): React.ReactElement | null => {
  const { t } = useTranslation();
  const rows = statisticStore.statisticsByCommits.release.totalInfo;
  if (rows?.length < 2) return mode !== 'print' ? (<NothingFound />) : null;

  return (
    <>
      <Chart content={rows} />
      <If value={mode !== 'print'}>
        <UiKitButton
          mode={['slim']}
          className={style.team_release_download}
          onClick={saveReleaseNote}
        >
          {t('plugin.team_release.download')}
        </UiKitButton>
      </If>

      <If value={mode === 'print'}>
        <Title title="plugin.team_release.title"/>
      </If>

      <FakeDataLoader
        content={rows}
        mode={mode}
        watch={`${mode}${statisticStore.hash}`}
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
