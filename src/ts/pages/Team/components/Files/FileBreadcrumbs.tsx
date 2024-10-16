import React from 'react';
import { observer } from 'mobx-react-lite';

import style from '../../styles/path.module.scss';
import treeStore from '../../store/Tree';

const FileBreadcrumbs = observer((): React.ReactElement => {
  const directories = treeStore.selectedPath
    .map((dirName: string, index: number) => (
      <span key={dirName}>
        <span className={style.file_breadcrumbs_text}>
          {'/'}
        </span>
        <span
          className={`${style.file_breadcrumbs_text} ${style.file_breadcrumbs_link}`}
          onClick={() => {
            const newPath = treeStore.selectedPath.slice(0, index + 1);
            treeStore.updateFilter('selectedPath', newPath);
          }}
        >
          {dirName}
        </span>
      </span>
    ));

  return (
    <h3 className={style.file_breadcrumbs}>
      <span className={style.file_breadcrumbs_text}>
        Адрес:
      </span>
      <span
        className={`${style.file_breadcrumbs_text} ${style.file_breadcrumbs_link}`}
        onClick={() => {
          treeStore.updateFilter('selectedPath', []);
        }}
      >
        {'..'}
      </span>
      {directories}
    </h3>
  );
});

export default FileBreadcrumbs;
