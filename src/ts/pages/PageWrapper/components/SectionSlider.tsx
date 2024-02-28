import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import isMobile from 'ts/helpers/isMobile';

import { TEAM, PERSON } from '../helpers/menu';
import style from '../styles/slider.module.scss';

interface ISectionSliderProps {
  getViewById: Function;
}

function addSlider(
  page: string,
  prevPage: string,
  pages: any[],
  setPrevPage: Function,
  setCurrentView: Function,
) {
  const index = pages.map((item) => item.id).indexOf(page);
  const prevIndex = pages.map((item) => item.id).indexOf(prevPage);
  const direction = prevIndex < index
    ? [ style.slider_exit_left,  style.slider_entrance_right]
    : [ style.slider_exit_right,  style.slider_entrance_left];
  const [exitAnimation, entranceAnimation] = direction;

  setCurrentView([prevPage, exitAnimation]);
  setTimeout(() => {
    setCurrentView([page || '', entranceAnimation]);
  }, 250);
  setTimeout(() => {
    setCurrentView([]);
    setPrevPage(page || '');
  }, 500);
  setTimeout(() => {
    document.body.scrollIntoView();
  }, 600);
}

function MobileView({ getViewById }: ISectionSliderProps) {
  const { type, page } = useParams<any>();
  const formattedPage = page || 'total';
  const [prevPage, setPrevPage] = useState<string>(formattedPage);
  const [currentView, setCurrentView] = useState<string[]>([]);
  const list  = type === 'team' ? TEAM : PERSON;

  useEffect(() => {
    addSlider(
      page || '',
      prevPage,
      list,
      setPrevPage,
      setCurrentView,
    );
  }, [page]);

  if (!currentView.length) {
    return getViewById(page);
  }

  const [viewName, className] = currentView;
  return (
    <div className={className}>
      {getViewById(viewName)}
    </div>
  );
}

function DesktopView({ getViewById }: ISectionSliderProps) {
  const { page } = useParams<any>();
  return getViewById(page || 'total');
}

export default function SectionSlider({ getViewById }: ISectionSliderProps) {
  return isMobile
    ? <MobileView getViewById={getViewById} />
    : <DesktopView getViewById={getViewById} />;
}
