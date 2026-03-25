import React from 'react';

import If from '../If';
import CommitFormat from './components/CommitFormat';
import EmptySearch from './components/EmptySearch';
import IsStaff from './components/IsStaff';
import style from './index.module.scss';

interface NothingFoundProps {
  mode?: string;
}

function NothingFound({
  mode,
}: NothingFoundProps) {
  return (
    <div className={style.nothing_found_wrapper}>
      <div className={style.nothing_found}>
        <img
          src="./assets/cards/nothing_found.svg"
          className={style.nothing_found_icon}
        />
        <If value={!mode}>
          <CommitFormat />
        </If>
        <If value={mode === 'staff'}>
          <IsStaff />
        </If>
        <If value={mode === 'search'}>
          <EmptySearch />
        </If>
      </div>
    </div>
  );
}

export default NothingFound;
