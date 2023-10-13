import React from 'react';

import Button from './Button';
import Input from './Input';

import style from '../../styles/filters.module.scss';

function Logo() {
  return (
    <div className={style.header_filters}>
      <Input
        type="from"
        placeholder="с"
      />
      {' — '}
      <Input
        type="to"
        placeholder="по"
      />
      <div className={style.header_filters_fast}>
        <Button
          title="sidebar.filters.all"
          type="all"
        />
        <Button
          title="sidebar.filters.year"
          type="year"
        />
        <Button
          title="sidebar.filters.halfYear"
          type="halfYear"
        />
        <Button
          title="sidebar.filters.month"
          type="month"
        />
        <Button
          title="sidebar.filters.week"
          type="week"
        />
      </div>
    </div>
  );
}

export default Logo;
