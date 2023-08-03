import React from 'react';

import style from '../styles/index.module.scss';

interface IExtensionIconProps {
  title: string;
}

function ExtensionIcon({
  title,
}: IExtensionIconProps): React.ReactElement | null {
  return (
    <div className={style.extension_icon}>
      {title || ''}
    </div>
  );
}

export default ExtensionIcon;
