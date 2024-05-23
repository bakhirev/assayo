import {
  makeObservable, observable, action, computed,
} from 'mobx';

import ISort from 'ts/interfaces/Sort';

export interface IDataLoaderStoreProps {
  loader: Function;
  callback?: Function;
  updateUrlCallback?: Function;
  watch?: string | number | null | undefined;
  defaultPageNumber?: number;
  defaultPageSize?: number;
}

export interface IDataLoaderStore {
  state: string;
  watchedValue: string | number | null | undefined;
  defaultPageNumber: number;
  defaultPageSize: number;
  sort: ISort[];
  loader: Function;
  response: any;
  fetchData: Function;
  loadMore: Function;
  showAll: Function;
  goToPage: Function;
  updateWatchedValue: Function;
  canSendRequest: boolean;
}

export const DataLoaderState = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  LOADING_MORE: 'LOADING_MORE',
  LOADING_ALL: 'LOADING_ALL',
  LOADING_PAGE: 'LOADING_PAGE',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export class DataLoaderStore implements IDataLoaderStore {
  state: string = DataLoaderState.INIT;

  watchedValue: string | number | null | undefined = '';

  defaultPageNumber: number = 0;

  defaultPageSize: number = 10;

  pageNumber: number = 0;

  pageSize: number = 10;

  sort: ISort[] = [];

  loader: Function = () => {
  };

  callback: Function | undefined = () => {
  };

  response: any = null;

  constructor({
    loader,
    callback,
    defaultPageNumber,
    defaultPageSize,
    watch,
  }: IDataLoaderStoreProps) {
    this.loader = loader;
    this.callback = callback;
    this.defaultPageNumber = defaultPageNumber || 0;
    this.defaultPageSize = defaultPageSize || 10;
    this.watchedValue = watch || '';

    makeObservable(this, {
      state: observable,
      watchedValue: observable,
      // response: observable,
      sort: observable,
      fetchData: action,
      successCallback: action,
      errorCallback: action,
      loadMore: action,
      showAll: action,
      updateSort: action,
      canSendRequest: computed,
    });
  }

  newSearch() {
    return this.fetchData(DataLoaderState.LOADING, {
      pageNumber: this.defaultPageNumber,
      pageSize: this.defaultPageSize,
    });
  }

  updateSort(sort: ISort[]) {
    this.sort = sort || [];
    this.newSearch();
  }

  goToPage(pageNumber: number, pageSize: number) {
    return this.fetchData(DataLoaderState.LOADING_PAGE, { pageNumber, pageSize });
  }

  loadMore() {
    const pageNumber = this.pageNumber + 1;
    return this.fetchData(DataLoaderState.LOADING_MORE, { pageNumber, pageSize: this.pageSize });
  }

  showAll() {
    if (this.pageNumber === 0 && this.response?.totalPages === 2) return this.loadMore();
    const pageSize = this.response?.totalElements || 100;
    return this.fetchData(DataLoaderState.LOADING_ALL, { pageNumber: 0, pageSize });
  }

  get canSendRequest() {
    return ![
      DataLoaderState.LOADING,
      DataLoaderState.LOADING_MORE,
      DataLoaderState.LOADING_ALL,
      DataLoaderState.LOADING_PAGE,
      DataLoaderState.ERROR,
    ].includes(this.state);
  }

  async fetchData(status: string, parameters: any = {}) {
    if (!this.canSendRequest) return;
    this.state = status;
    try {
      const { pageNumber: page, pageSize: size } = parameters;
      if (this.callback) this.callback();
      const response = await this.loader({ page, size }, this.sort);
      this.successCallback(response);
    } catch (error) {
      const response = await error;
      this.errorCallback(response);
    }
  }

  successCallback(response: any) {
    this.setResponse(response);
    this.pageSize = this.response?.size || this.response?.pageSize || 10;
    this.pageNumber = this.response?.number || this.response?.pageNumber || 0;
    if (this.callback) {
      this.callback(this.response);
    }
    this.state = DataLoaderState.SUCCESS;
  }

  setResponse(response: any) {
    if (this.state === DataLoaderState.LOADING_MORE) {
      this.response = {
        ...response,
        content: [
          ...this.response.content,
          ...response.content,
        ],
      };
    } else {
      this.response = response;
    }
  }

  errorCallback(error: any) {
    if (this.state === DataLoaderState.LOADING) {
      this.response = error;
    }
    this.state = DataLoaderState.ERROR;
  }

  updateWatchedValue(watchedValue: string | number | null | undefined) {
    this.watchedValue = watchedValue;
    this.state = DataLoaderState.INIT;
    this.newSearch();
  }
}
