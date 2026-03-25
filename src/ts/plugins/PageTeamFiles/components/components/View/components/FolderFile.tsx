import React, { ReactNode } from 'react';

import style from '../index.module.scss';

interface FolderFileProps {
  children: ReactNode;
  isSelected?: boolean;
}

export function CellWithSelect({ children, isSelected }: FolderFileProps) {
  const className = isSelected
    ? style.plugin_team_files_table_select
    : style.plugin_team_files_table_not_select;

  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CommonProps {
  name?: string;
  isSelected?: boolean;
}

export function FolderCell({ name, isSelected }: CommonProps) {
  return (
    <CellWithSelect isSelected={isSelected}>
      {`📁 ${name || ''}`}
    </CellWithSelect>
  );
}

export function FileCell({ name, isSelected }: CommonProps) {
  return (
    <CellWithSelect isSelected={isSelected}>
      {`📄 ${name || ''}`}
    </CellWithSelect>
  );
}
