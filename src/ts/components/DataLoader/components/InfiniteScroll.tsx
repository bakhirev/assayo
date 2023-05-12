import React, { ReactNode, useLayoutEffect, useRef } from 'react';

import type { IPagination } from 'ts/interfaces/Pagination';
import Loading from 'ts/components/Loading';

import { IDataLoaderStore, DataLoaderState } from '../store';
import ErrorDescription from '../ErrorDescription';

import style from '../styles/scroll.module.scss';

interface IInfiniteScrollProps {
  response?: IPagination<any> | null | undefined;
  children?: ReactNode;
  to?: string;
  from?: string;
  state?: string;
  store?: IDataLoaderStore | null;
}

function getScrollEventTarget(element: any, offsetTop: number = 0) {
  let currentNode = element;
  let currentOffsetTop = offsetTop;

  while (currentNode
    && currentNode.tagName !== 'HTML'
    && currentNode.tagName !== 'BODY'
    && currentNode.nodeType === 1) {
    const { overflowY } = document?.defaultView?.getComputedStyle(currentNode) || {};
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return [currentNode, offsetTop];
    }
    currentOffsetTop += currentNode.offsetTop;
    currentNode = currentNode.parentNode;
  }
  return [window, currentOffsetTop];
}

function InfiniteScroll({
  response,
  children,
  to,
  from,
  state,
  store,
}: IInfiniteScrollProps): JSX.Element | null {
  if (!response) return null;
  const ref = useRef(null);
  const {
    number: pageNumber,
    size: pageSize,
    totalElements,
  } = response;
  const totalPages = Math.ceil(totalElements / pageSize);

  useLayoutEffect(() => {
    const [parent, offsetTop] = getScrollEventTarget(ref.current);
    const handleScroll = (event: any) => {
      if (state !== DataLoaderState.SUCCESS) return;
      const targetElement = event.target === document
        ? document.scrollingElement
        : event.target;
      const { scrollTop, scrollHeight, clientHeight } = targetElement;
      const scrollSize = scrollHeight - clientHeight;
      const limit = scrollSize - offsetTop - 10;

      if (scrollTop < limit) return;
      if (store
          && store.canSendRequest
          && pageNumber < (totalPages - 1)) {
        store.loadMore();
      }
    };

    parent.addEventListener('scroll', handleScroll);
    return () => parent?.removeEventListener('scroll', handleScroll);
  }, []);

  if (state === DataLoaderState.ERROR) {
    return (<ErrorDescription response={store?.response} />);
  }

  const showLoading = [
    DataLoaderState.LOADING_ALL,
    DataLoaderState.LOADING_MORE,
  ].includes(state || '');

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const content = from
      ? response[from]
      : response;
    const newProps = { [to || 'response']: content };
    return React.cloneElement(child, newProps);
  });

  return (
    <>
      <div className={style.infinite_scroll_border_top} />
      <div ref={ref}>
        {childrenWithProps}
        {showLoading && <Loading height={40} />}
      </div>
      <div className={style.infinite_scroll_border_bottom} />
    </>
  );
}

InfiniteScroll.defaultProps = {
  response: null,
  children: null,
  state: DataLoaderState.INIT,
  to: null,
  from: null,
  store: null,
};

export default InfiniteScroll;
