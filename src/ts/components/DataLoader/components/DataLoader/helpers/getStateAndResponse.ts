import { DataLoaderStore, DataLoaderState } from '../../../store';

export default function getStateAndResponse(store: any = null, from: string = '') {
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
