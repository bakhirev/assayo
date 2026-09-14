import { IPaginationRequest } from 'ts/interfaces/Pagination';
import ISort from 'ts/interfaces/Sort';

export default function getNewProps(
  _child: any = null,
  store: any = null,
  state: string = '',
  response: any = null,
  to: string = 'response',
  from: string = '',
  parameterInUrl: string[] = [''],
  pagination: IPaginationRequest = { page: 0, size: 10 },
) {
  return {
    [to]: response,
    updateSort: (sort: ISort[]) => store?.updateSort(sort),
    response: store?.response,
    to,
    from,
    state,
    store,
    parameterInUrl,
    pagination,
  };
}
