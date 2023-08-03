import React from 'react';

import style from '../styles/index.module.scss';

interface IExtensionLineProps {
  title: string;
  value: any;
}

function ExtensionLine({
  title,
  value,
}: IExtensionLineProps): React.ReactElement | null {
  if (!value || !title) return null;

  return (
    <div className={style.extension_line}>
      <div className={style.extension_line_title}>
        {title || ''}
      </div>
      <div className={style.extension_line_value}>
        {value || ''}
      </div>
    </div>
  );
}

export default ExtensionLine;
