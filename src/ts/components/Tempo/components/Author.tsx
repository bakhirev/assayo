import React from 'react';

import style from '../styles/index.module.scss';

interface IAuthorProps {
  name: string;
}

function Author({ name }: IAuthorProps) {
  return (
    <div className={style.tempo_author}>
      {name || ''}
    </div>
  );
}

export default Author;
