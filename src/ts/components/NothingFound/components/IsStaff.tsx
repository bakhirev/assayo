import React from 'react';

import style from '../index.module.scss';

function IsStaff() {
  return (
    <>
      <p className={style.nothing_found_title}>
        Нет данных для этого сотрудника
      </p>
      <p className={style.nothing_found_text}>
        Он вносил правки не каждый рабочий день и получил статус Помошник.
        Работой сотрудников с таким статусом по данному проекту можно пренебречь, т.к. его влад на общем фоне незначителен.
      </p>
      <p className={style.nothing_found_text}>
        Поэтому система не рассчитывает для него ряд показателей.
        Если это ошибка и данного сотрудника надо рассчитать как обычного, перейдите в раздел Настройки и измените его тип.
      </p>
    </>
  );
}

export default IsStaff;
