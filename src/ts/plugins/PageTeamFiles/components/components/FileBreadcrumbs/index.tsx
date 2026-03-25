import React from 'react';

import style from './index.module.scss';

interface BreadcrumbProps {
  dirName?: string;
  onClick: () => void;
}

function Breadcrumb({ dirName, onClick }: BreadcrumbProps) {
  return (
    <span
      className={`${style.file_breadcrumbs_text} ${style.file_breadcrumbs_link}`}
      onClick={onClick}
    >
      {dirName || '..'}
    </span>
  );
}

interface FileBreadcrumbsProps {
  path: string[];
  setPath: (value: string[]) => void;
}

function FileBreadcrumbs({
  path,
  setPath,
}: FileBreadcrumbsProps) {
  const directories = path.map((dirName: string, index: number) => (
    <span key={dirName}>
      <span className={style.file_breadcrumbs_text}>
        {'/'}
      </span>
      <Breadcrumb
        dirName={dirName}
        onClick={() => {
          setPath(path.slice(0, index + 1));
        }}
      />
    </span>
  ));

  return (
    <h3 className={style.file_breadcrumbs}>
      <span className={style.file_breadcrumbs_text}>
        Адрес:
      </span>
      <Breadcrumb
        onClick={() => {
          setPath([]);
        }}
      />
      {directories}
    </h3>
  );
}

export default FileBreadcrumbs;
