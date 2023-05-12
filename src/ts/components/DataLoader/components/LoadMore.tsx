import React from 'react';

import type { IPagination } from 'ts/interfaces/Pagination';
import Loading from 'ts/components/Loading';

import { IDataLoaderStore, DataLoaderState } from '../store';
import ErrorDescription from '../ErrorDescription';

import style from '../styles/more.module.scss';

interface ILoadMoreProps {
  response?: IPagination<any> | null | undefined;
  className?: string;
  title?: string;
  state?: string;
  store?: IDataLoaderStore | null;
}

function LoadMore({
  response,
  state,
  store,
  className,
  title,
}: ILoadMoreProps) {
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
      className={`${style.load_more} ${className || ''}`}
      onClick={() => { if (store) store.loadMore(); }}
    >
      {title || 'Загрузить ещё'}
    </div>
  );
}

LoadMore.defaultProps = {
  response: null,
  className: '',
  title: '',
  state: DataLoaderState.INIT,
  store: null,
};

export default LoadMore;
