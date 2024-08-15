import React from 'react';
import { useTranslation } from 'react-i18next';

import { IColumn } from 'ts/components/Table/interfaces/Column';

import style from '../styles/index.module.scss';

interface LineWithTemplateProps {
  column: IColumn;
  item: any;
  className?: string | Function;
  value: React.ReactNode | React.ReactNode[] | null;
}

function LineWithTemplate({
  column,
  item,
  className,
  value,
}: LineWithTemplateProps): JSX.Element | null {
  const { t } = useTranslation();
  const columnClassName = typeof column.className === 'function'
    ? column.className('body', item)
    : column.className;

  if (!value) return null;

  return (
    <div className={`${style.card_line_with_template} ${className || ''} ${columnClassName || ''}`}>
      <div className={style.card_line_with_template_title}>
        {t(column.title || '')}
      </div>
      {value}
    </div>
  );
}

LineWithTemplate.defaultPeops = {
  className: '',
};

export default LineWithTemplate;
