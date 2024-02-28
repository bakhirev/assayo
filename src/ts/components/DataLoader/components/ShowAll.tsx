import React from 'react';
import { useTranslation } from 'react-i18next';

import type { IPagination } from 'ts/interfaces/Pagination';
import Loading from 'ts/components/Loading';

import { IDataLoaderStore, DataLoaderState } from '../store';
import ErrorDescription from '../ErrorDescription';

import style from '../styles/show_all.module.scss';

interface IShowAllProps {
  response?: IPagination<any[]> | null | undefined;
  className?: string;
  state?: string;
  store?: IDataLoaderStore | null;
}

function ShowAll({
  response,
  state,
  store,
  className,
}: IShowAllProps) {
  const { t } = useTranslation();
  if (!response) return null;
  const {
    number: pageNumber,
    totalPages,
  } = response;

  if (state === DataLoaderState.INIT
    || pageNumber >= (totalPages - 1)) return null;

  if ([
    DataLoaderState.LOADING_ALL,
    DataLoaderState.LOADING_MORE,
  ].includes(state || '')) {
    return (
      <Loading height={40} />
    );
  }

  if (state === DataLoaderState.ERROR) {
    return (<ErrorDescription response={store?.response} />);
  }

  return (
      <div
        className={`${style.show_all} ${className || ''}`}
        onClick={() => { if (store) store.showAll(); }}
      >
        {t('uiKit.dataLoader.all')}
      </div>
  );
}

ShowAll.defaultProps = {
  response: null,
  className: '',
  state: DataLoaderState.INIT,
  store: null,
};

export default ShowAll;
