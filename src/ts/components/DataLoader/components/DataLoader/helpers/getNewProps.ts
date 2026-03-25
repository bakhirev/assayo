import { IPaginationRequest } from 'ts/interfaces/Pagination';
import ISort from 'ts/interfaces/Sort';

function isPagination(children: any = null) {
  return ('response' in children?.props
      && 'state' in children?.props
      && 'store' in children?.props)
    || 'parameterInUrl' in children?.props
    || 'pagination' in children?.props;
}

export default function getNewProps(
  child: any = null,
  store: any = null,
  state: string = '',
  response: any = null,
  to: string = 'response',
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
