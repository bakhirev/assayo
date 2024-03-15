import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TEAM, PERSON } from '../helpers/menu';

function getXByEvent(event: any) {
  return event.screenX || event?.touches?.[0]?.screenX || 0;
}

function getYByEvent(event: any) {
  return event.screenY || event?.touches?.[0]?.screenY || 0;
}

function getLeftWithLimits(moveEvent: any) {
  if (moveEvent?.top > 15
    || moveEvent?.top < -15) return 0;

  const size =  Math.abs(moveEvent?.left || 0);
  const direction =  size / (moveEvent?.left || 0);
  return size > 20
    ? (Math.min(size, 40) * direction)
    : 0;
}

function addSwipeEvents(
  element: any,
  urlParameters: any,
  setMoveEvent: Function,
  navigate: Function,
) {
  let top = 0;
  let left = 0;
  let firstPositionX = 0;
  let firstPositionY = 0;
  let overflowX: any = undefined;

  function onStart(event: any) {
    setMoveEvent({ top: 0, left: 0 });
    top = 0;
    left = 0;
    firstPositionY = getYByEvent(event);
    firstPositionX = getXByEvent(event);
    overflowX = document.body.style.overflowX;
    document.body.style.overflowX = 'hidden';
  }

  function onMove(event: any) {
    if (!firstPositionX) return;
    top = getYByEvent(event) - firstPositionY;
    left = getXByEvent(event) - firstPositionX;
    setMoveEvent({ top, left });
  }

  function onEnd() {
    if (!firstPositionX) return;
    const { type, page, userId } = urlParameters;
    const list  = type === 'team' ? TEAM : PERSON;
    const pages = list.map((item) => item.id).filter((value) => value);
    const index = pages.indexOf(page || 'total');
    const getUrl = type === 'team'
      ? (newPage?: string) => `/team/${newPage || 'total'}`
      : (newPage?: string) => `/person/${newPage || 'total'}/${userId || '0'}`;
    const hasSmallShiftByY = Math.abs(top) < 15;

    if (left > 30 && index > 0 && hasSmallShiftByY) {
      navigate(getUrl(pages[index - 1]));
    }

    const hasNext = index >= 0 && index < (pages.length - 1);
    if (left < -30 && hasNext && hasSmallShiftByY) {
      navigate(getUrl(pages[index + 1]));
    }

    document.body.style.overflowX = overflowX;
    setMoveEvent(null);
  }

  function onCancel() {
    if (!firstPositionX) return;
    top = 0;
    left = 0;
    document.body.style.overflowX = overflowX;
    setMoveEvent(null);
  }

  // const events = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
  const events = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

  element.addEventListener(events[0], onStart);
  element.addEventListener(events[1], onMove);
  element.addEventListener(events[2], onEnd);
  element.addEventListener(events[3], onCancel);

  return () => {
    element.removeEventListener(events[0], onStart);
    element.removeEventListener(events[1], onMove);
    element.removeEventListener(events[2], onEnd);
    element.removeEventListener(events[3], onCancel);
  };
}

interface IPageSwiperProps {
  children: ReactNode;
}

export default function PageSwiper({ children }: IPageSwiperProps) {
  const { type, page, userId } = useParams<any>();
  const navigate = useNavigate();
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [moveEvent, setMoveEvent] = useState<any>(null);
  const left = getLeftWithLimits(moveEvent);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;
    return addSwipeEvents(
      element,
      { type, page, userId },
      setMoveEvent,
      navigate,
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', left }}
    >
      {children}
    </div>
  );
}
