import React from 'react';

import style from '../styles/progress.module.scss';

interface IProgressProps {
  progress: number;
}

function Progress({
  progress,
}: IProgressProps): React.ReactElement | null {
  return (
    <div className={style.quize_progress}>
      <div className={style.quize_progress_line}>
        <div className={style.quize_progress_text}>
          {progress}
        </div>
      </div>
    </div>
  );
}

export default Progress;
