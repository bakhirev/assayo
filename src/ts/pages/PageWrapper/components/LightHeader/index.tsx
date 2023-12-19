import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import localization from 'ts/helpers/Localization';
import { TEAM, PERSON } from '../../helpers/menu';

import style from '../../styles/light_header.module.scss';

function getPagesAndIndex(type?: string, page?: string) {
  const pages = (type === 'person' ? PERSON : TEAM)
    .filter((item: any) => item.id);

  const index = pages
    .map((item: any) => item.id)
    .indexOf(page);

  return { pages, index };
}

function getLink(page: any, type?: string, userId?: string) {
  const nextLink = page?.link || '';
  return type === 'person'
    ? `${nextLink}${userId}`
    : nextLink;
}

function LightHeader() {
  const navigate = useNavigate();
  const { type, page, userId } = useParams<any>();
  const title = type && page
    ? localization.get(`sidebar.${type}.${page}`)
    : localization.get('sidebar.team.total');

  return (
    <>
      <header className={style.light_header}>
        <div
          className={style.light_header_button}
          onClick={() => {
            const { pages, index } = getPagesAndIndex(type, page);
            if (index < 1) return;
            const nextLink = getLink(pages[index - 1], type, userId);
            navigate(nextLink);
          }}
        />
        <h2 className={style.light_header_title}>
          {title}
        </h2>
        <div
          className={style.light_header_button}
          onClick={() => {
            const { pages, index } = getPagesAndIndex(type, page);
            if (index < 0
              || index === (pages.length - 1)) return;
            const nextLink = getLink(pages[index + 1], type, userId);
            navigate(nextLink);
          }}
        />
      </header>
      <div className={style.light_header_gap} />
    </>
  );
}

export default LightHeader;
