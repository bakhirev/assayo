import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Title } from 'ts/components/Layout';
import dataGripStore from 'ts/store/DataGrip';
import fullScreen from 'ts/store/FullScreen';
import plugins from 'ts/helpers/Plugins';

import SectionSlider from 'ts/pages/PageWrapper/components/SectionSlider';
import printStore from 'ts/plugins/Print/components/store';

import UserSelect from './components/UserSelect';

interface IPersonProps {
  userId?: string | number;
}

function getViewByIdByUser(user: any, filters: any) {
  return function getViewById(page?: string) {
    let mode = undefined;
    if (fullScreen.isOpen) mode = 'fullscreen';
    if (printStore.processing) mode = 'print';
    return plugins.getPage(`/person/${page}`, {
      user,
      mode,
      filters,
    });
  };
}

const Person = observer(({
  userId,
}: IPersonProps) => {
  const { t } = useTranslation();
  const { type, page, userId: userIdFromUrl } = useParams<any>();

  const rows = dataGripStore.dataGrip.timestamp.statistic.allCommitsByTimestamp || [];
  const defaultWeek = rows.length
    ? rows[rows.length - 1].week
    : 0;
  const [filters, setFilters] = useState<any>({ week: defaultWeek });

  const user = dataGripStore.dataGrip.author.statistic[userId || userIdFromUrl || 0];
  if (type !== 'person' || !user) return null;

  const getViewById = getViewByIdByUser(user, filters);
  return (
    <>
      {page !== 'print' && (
        <>
          <Title title={t('common.filters')} />
          <UserSelect
            filters={filters}
            onChange={setFilters}
          />
        </>
      )}
      <SectionSlider getViewById={getViewById} />
    </>
  );
});

export default Person;
