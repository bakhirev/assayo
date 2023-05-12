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
          title="всё время"
          type="all"
        />
        <Button
          title="год"
          type="year"
        />
        <Button
          title="пол года"
          type="halfYear"
        />
        <Button
          title="месяц"
          type="month"
        />
        <Button
          title="неделя"
          type="week"
        />
      </div>
    </div>
  );
}

export default Logo;
