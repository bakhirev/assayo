import React, { useState } from 'react';

import style from '../styles/index.module.scss';

interface ITitleProps {
  title: string,
}

function Title({ title }: ITitleProps): React.ReactElement | null {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={`${style.tv100and1_cell_title}`}>
      {title}
      <button
        className={`${style.tv100and1_button} ${show ? style.animation : ''}`}
        onClick={() => {
          setShow(true);
        }}
      />
    </div>
  );
}

export default Title;
