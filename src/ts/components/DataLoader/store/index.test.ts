import { DataLoaderStore, DataLoaderState } from './index';

describe('Testing an instance of the DataLoaderStore class', () => {
  it('Make sure that for using method newSearch set SUCCESS state and set data from loader in response', () => {
    const loader = () => Promise.resolve(666);
    const store = new DataLoaderStore({ loader });
    return store.newSearch().then(() => {
      expect(store.response).toBe(666);
      expect(store.state).toBe(DataLoaderState.SUCCESS);
    });
  });

  it('Make sure that for using method loadMore set SUCCESS state and add new data in response', () => {
    const loader = () => Promise.resolve({
      content: [4, 5, 6],
    });
    const store = new DataLoaderStore({ loader });
    store.response = { content: [1, 2, 3] };
    return store.loadMore().then(() => {
      expect(store.response).toEqual({ content: [1, 2, 3, 4, 5, 6] });
      expect(store.state).toBe(DataLoaderState.SUCCESS);
    });
  });

  it('Make sure that for using method showAll set SUCCESS state and set data from loader in response', () => {
    const loader = () => Promise.resolve(777);
    const store = new DataLoaderStore({ loader });
    store.response = { totalElements: 30 };
    return store.showAll().then(() => {
      expect(store.response).toBe(777);
      expect(store.state).toBe(DataLoaderState.SUCCESS);
    });
  });

  it('Make sure that method errorCallback set ERROR state and update response for state LOADING', () => {
    const loader = () => Promise.resolve(666);
    const store = new DataLoaderStore({ loader });
    store.state = DataLoaderState.LOADING;
    store.errorCallback('Error message');
    expect(store.response).toBe('Error message');
    expect(store.state).toBe(DataLoaderState.ERROR);
  });

  it('Make sure that method errorCallback set ERROR state and not update response for state LOADING_MORE', () => {
    const loader = () => Promise.resolve(666);
    const store = new DataLoaderStore({ loader });
    store.state = DataLoaderState.LOADING_MORE;
    store.response = null;
    store.errorCallback('Error message');
    expect(store.response).toBe(null);
    expect(store.state).toBe(DataLoaderState.ERROR);
  });

  it('Make sure that method errorCallback set ERROR state and not update response for state LOADING_ALL', () => {
    const loader = () => Promise.resolve(666);
    const store = new DataLoaderStore({ loader });
    store.state = DataLoaderState.LOADING_ALL;
    store.response = null;
    store.errorCallback('Error message');
    expect(store.response).toBe(null);
    expect(store.state).toBe(DataLoaderState.ERROR);
  });
});
