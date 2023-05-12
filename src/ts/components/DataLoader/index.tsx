import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { IPaginationRequest } from 'ts/interfaces/Pagination';
import ISort from 'ts/interfaces/Sort';
import NothingFound from 'ts/components/NothingFound';
import Loading from 'ts/components/Loading';

import { DataLoaderStore, IDataLoaderStore, DataLoaderState } from './store';
import ErrorDescription from './ErrorDescription';

interface IDataLoaderProps {
  watch?: string | number | null | undefined;
  children: ReactNode;
  loader: Function;
  callback?: Function;
  to: string;
  id?: string;
  className?: string;
  from?: string;
  height?: number;
  size?: 'l' | 'm' | 's',
  parameterInUrl?: string[];
  pagination?: IPaginationRequest;
}

function getStateAndResponse(store: any = null, from: string = '') {
  let state = DataLoaderState.INIT;
  let response: any = null;
  if (store instanceof DataLoaderStore) {
    state = store.state;
    if ([
      DataLoaderState.SUCCESS,
      DataLoaderState.LOADING_MORE,
      DataLoaderState.LOADING_ALL,
    ].includes(state)) {
      response = from
        ? store.response[from]
        : store.response;
    }
  }
  return { state, response };
}

function isPagination(child: any = null) {
  return ('response' in child?.props
      && 'state' in child?.props
      && 'store' in child?.props)
      || 'parameterInUrl' in child?.props
      || 'pagination' in child?.props;
}

function getNewProps(
  child: any = null,
  store: any = null,
  state: string = '',
  response: any = null,
  to: string = '',
  from: string = '',
  parameterInUrl: string[] = [''],
  pagination: IPaginationRequest = { page: 0, size: 10 },
) {
  if (isPagination(child)) {
    return {
      response: store?.response,
      to,
      from,
      state,
      store,
      parameterInUrl,
      pagination,
    };
  }
  return {
    [to]: response,
    updateSort: (sort: ISort[]) => store?.updateSort(sort),
  };
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DataLoader = observer(({
  watch,
  children,
  loader,
  callback,
  to,
  from,
  height,
  id,
  className,
  parameterInUrl,
  pagination,
}: IDataLoaderProps) => {
  const query = useQuery();
  const [store, setStore] = useState<IDataLoaderStore>();

  const pageNumberFromUrl = parameterInUrl?.includes('pageNumber')
    ? parseInt(query.get('pageNumber') || '', 10) || 0
    : 0;

  const pageSizeFromUrl = parameterInUrl?.includes('pageSize')
    ? parseInt(query.get('pageSize') || '', 10) || 10
    : 10;

  useEffect(() => {
    if (!(store instanceof DataLoaderStore)) {
      const dataLoaderStore = new DataLoaderStore({
        loader,
        callback,
        defaultPageNumber: pageNumberFromUrl || pagination?.page,
        defaultPageSize: pageSizeFromUrl || pagination?.size,
        watch,
      });
      dataLoaderStore.newSearch();
      setStore(dataLoaderStore);
    } else if (store.response) {
      store.loader = loader;
      store.callback = callback;
      if ((watch || store.watchedValue) && store.watchedValue !== watch) {
        store.updateWatchedValue(watch);
      } else if (parameterInUrl
        && (store.pageNumber !== pageNumberFromUrl || store.pageSize !== pageSizeFromUrl)) {
        store.goToPage(pageNumberFromUrl, pageSizeFromUrl);
      } else if (pagination
        && (store.pageNumber !== pagination?.page
          || store.pageSize !== pagination?.size)) {
        const currentPage = pagination?.page || 0;
        const currentSize = pagination?.size || 10;
        store.goToPage(currentPage, currentSize);
      }
    }
  });

  const { state, response } = getStateAndResponse(store, from);

  if (state === DataLoaderState.LOADING || state === DataLoaderState.LOADING_PAGE) {
    return <Loading height={height || 80} />;
  }

  if (state === DataLoaderState.ERROR) {
    return <ErrorDescription response={store?.response} />;
  }

  const childrenWithProps = React.Children.map(
    children,
    (child) => (React.isValidElement(child)
      ? React.cloneElement(
        child,
        getNewProps(child, store, state, response, to, from, parameterInUrl, pagination),
      ) : child),
  );

  const nothingFoundBlock = childrenWithProps?.find((child: any) => child.type === NothingFound);

  if (state === DataLoaderState.SUCCESS && nothingFoundBlock) {
    if (Object.keys(response || {}).length === 0 || response?.content?.length === 0) {
      return (<>{nothingFoundBlock}</>);
    }
  }

  const filteredChildrenWithProps = childrenWithProps?.filter(
    (child: any) => child.type !== NothingFound,
  );

  if (!className) {
    return (<>{filteredChildrenWithProps}</>);
  }

  return (
    <div
      id={id || ''}
      className={className || ''}
    >
      {filteredChildrenWithProps}
    </div>
  );
});

export default DataLoader;
