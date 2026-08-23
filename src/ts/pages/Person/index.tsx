import React from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import { Title } from 'ts/components/Layout';
import statisticStore from 'ts/store/StatisticsByCommitsStore';
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
  const { type, page, userId: userIdFromUrl } = useParams<any>();

  const filters = {};

  const userIdFromUrlNumber = parseInt(userIdFromUrl || '0', 10) || 0;
  const totalInfo = statisticStore.statisticsByCommits.author.totalInfo;
  const index = userId || userIdFromUrlNumber || 0;
  const user = totalInfo[index];
  if (type !== 'person' || !user) return null;

  const getViewById = getViewByIdByUser(user, filters);
  return (
    <>
      {page !== 'print' && (
        <>
          <Title title="common.filters" />
          <UserSelect />
        </>
      )}
      <SectionSlider getViewById={getViewById} />
    </>
  );
});

export default Person;
