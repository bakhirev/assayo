import React, { ReactNode, useEffect, useState } from 'react';

import style from '../styles/index.module.scss';

interface IOneSymbolProps {
  show: boolean;
  children: ReactNode;
  mode?: string;
}

function OneSymbol({
  show,
  children,
  mode,
}: IOneSymbolProps): React.ReactElement | null {
  const [localShow, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(show);
  }, [show]);

  const className = localShow ? style.show_symbol_hide : '';
  const classNameBg = localShow ? style.show_symbol_bg_hide : '';
  const classNameMode = {
    'table-row': style.show_symbol_s,
  }[mode || ''] || '';

  return (
    <div className={`${style.show_symbol} ${className} ${classNameMode}`}>
      {children}
      <div
        className={`${style.show_symbol_bg} ${classNameBg}`}
        onClick={() => setShow(true)}
      />
    </div>
  );
}


export default OneSymbol;
