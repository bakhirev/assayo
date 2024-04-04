import React from 'react';
import { useTranslation } from 'react-i18next';

import type { IPagination, IPaginationRequest } from 'ts/interfaces/Pagination';
import UiKitInputString from 'ts/components/UiKit/components/InputString';
import UiKitButton from 'ts/components/UiKit/components/Button';
import Loading from 'ts/components/Loading';

import { DataLoaderState, IDataLoaderStore } from '../store';
import ErrorDescription from '../ErrorDescription';
import style from '../styles/paginator.module.scss';

interface ISimplePaginationProps {
  response?: IPagination<any> | null | undefined;
  state?: string;
  pagination?: IPaginationRequest,
  store?: IDataLoaderStore | null;
}

function SimplePagination({
  response,
  state,
  pagination,
  store,
}: ISimplePaginationProps) {
  const { t } = useTranslation();
  if (!response) return null;

  const pageSizeCurrent = pagination?.size || 10;

  const {
    number: pageNumber,
    size: pageSize,
    totalElements,
  } = response;
  const totalPages = Math.ceil(totalElements / pageSize);

  if (state === DataLoaderState.INIT
    || pageNumber > totalPages
    || totalPages === 1
    || !totalElements) return null;


  const canShowMore = !(state === DataLoaderState.INIT || pageNumber >= (totalPages - 1));

  if ([
    DataLoaderState.LOADING_ALL,
    DataLoaderState.LOADING_MORE,
  ].includes(state || '')) {
    return (
      <Loading height={40} />
    );
  }

  if (state === DataLoaderState.ERROR) {
    return (
      <ErrorDescription response={store?.response}/>
    );
  }

  return (
    <nav className={style.paginator}>
      <p className={style.paginator_text}>
        {t('uiKit.dataLoader.page')}
      </p>
      <UiKitButton
        mode="second"
        disabled={!pageNumber}
        onClick={() => {
          if (store) store.goToPage(pageNumber - 1, pageSize || pageSizeCurrent);
        }}
      >
        «
      </UiKitButton>
      <UiKitInputString
        className={style.paginator_page_number}
        value={pageNumber + 1}
        onChange={(newPageNumber: string) => {
          let formattedPageNumber = parseInt(newPageNumber || '1', 10);
          if (formattedPageNumber < 1) {
            formattedPageNumber = 1;
          }
          if (formattedPageNumber >= totalPages) {
            formattedPageNumber = totalPages;
          }
          if (store) store.goToPage(formattedPageNumber - 1, pageSize || pageSizeCurrent);
        }}
      />
      <UiKitButton
        mode="second"
        disabled={pageNumber === (totalPages - 1)}
        onClick={() => {
          if (store) store.goToPage(pageNumber + 1, pageSize || pageSizeCurrent);
        }}
      >
        »
      </UiKitButton>
      <p className={style.paginator_text}>
        {t('uiKit.dataLoader.from')}
      </p>
      <UiKitButton
        mode="second"
        onClick={() => {
          if (store) store.goToPage(totalPages - 1, pageSize || pageSizeCurrent);
        }}
      >
        {totalPages}
      </UiKitButton>
      <p className={style.paginator_text}>
        {t('uiKit.dataLoader.size')}
      </p>
      <UiKitInputString
        value={pageSize}
        className={style.paginator_page_number}
        onChange={(newPageSize: string) => {
          let formattedPageSize = parseInt(newPageSize || '10', 10);
          if (formattedPageSize < 1) {
            formattedPageSize = 1;
          }
          if (formattedPageSize > totalElements) {
            formattedPageSize = totalElements;
          }
          if (store) store.goToPage(0, formattedPageSize);
        }}
      />
      <p className={style.paginator_text}>
        {t('uiKit.dataLoader.rows')}
      </p>
      {canShowMore && (
        <UiKitButton
          mode="slim"
          onClick={() => {
            if (store) store.showAll();
          }}
        >
          {t('uiKit.dataLoader.all')}
        </UiKitButton>
      )}
    </nav>
  );
}

SimplePagination.defaultProps = {
  response: null,
  state: DataLoaderState.INIT,
  store: null,
  pagination: {},
};

export default SimplePagination;
