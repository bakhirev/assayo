import React, { ReactNode } from 'react';

import style from './index.module.scss';

interface ProgressCardProps {
  children: ReactNode;
}

function ProgressCard({ children }: ProgressCardProps): React.ReactElement {
  return (
    <div className={style.progress_card}>
      {children}
    </div>
  );
}

export default ProgressCard;
