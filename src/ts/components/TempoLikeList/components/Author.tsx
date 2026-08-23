import React from 'react';

import style from '../styles/index.module.scss';

interface AuthorProps {
  author?: string;
}

function Author({ author }: AuthorProps): React.ReactElement {

  return (
    <div className={style.tempo_like_list_author}>
      {author}
    </div>
  );
}

export default Author;
