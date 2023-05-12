import React, { useState } from 'react';

import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import UiKitColumns from 'ts/components/UiKit/components/Columns';
import UiKitSwitch from 'ts/components/UiKit/components/Switch';
import UiKitButton from 'ts/components/UiKit/components/Button';
import UiKitDate from 'ts/components/UiKit/components/Date';
import confirm from 'ts/components/ModalWindow/store/Confirm';
import Title from 'ts/components/Title';

import { IEmployeesSalary } from '../interfaces/Setting';
import style from '../styles/index.module.scss';

interface IUserSalaryProps {
  salary: IEmployeesSalary;
  index: number;
  onChange: Function;
  onRemove: Function;
}

function UserSalary({
  salary,
  index,
  onChange,
  onRemove,
}: IUserSalaryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={style.salary}>
      <Title
        title={`Дополнение к трудовому договору №${index}`}
        className={isOpen ? '' : style.salary_title}
      />
      <div className={style.salary_icons}>
        <img
          className={style.salary_icons_item}
          src="./assets/list/arrow.svg"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <>
          <UiKitColumns>
            <UiKitDate
              title="Дата начала действия"
              value={salary?.from}
              onChange={(from: string) => {
                onChange({ ...salary, from });
              }}
            />
            <UiKitSwitch
              title="Количество рабочих дней в неделю"
              value={salary.workDaysInWeek}
              options={[1, 2, 3, 4, 5, 6, 7]}
              onChange={(workDaysInWeek: number) => {
                onChange({ ...salary, workDaysInWeek });
              }}
            />
          </UiKitColumns>
          <UiKitColumns>
            <UiKitInputNumber
              title="Зарплата в месяц"
              value={salary?.value}
              onChange={(value: number) => {
                onChange({ ...salary, value });
              }}
            />
            <UiKitSwitch
              title="Валюта"
              value={salary?.currency}
              options={['RUB', 'USD', 'EUR']}
              onChange={(currency: string) => {
                onChange({ ...salary, currency });
              }}
            />
          </UiKitColumns>
          <UiKitColumns>
            <UiKitInputNumber
              title="Количество рабочих дней в году"
              value={salary?.workDaysInYear}
              onChange={(workDaysInYear: number) => {
                onChange({ ...salary, workDaysInYear });
              }}
            />
            <UiKitInputNumber
              title="Количество дней отпуска в год"
              value={salary?.vacationDaysInYear}
              onChange={(vacationDaysInYear: number) => {
                onChange({ ...salary, vacationDaysInYear });
              }}
            />
          </UiKitColumns>
          <div className={style.salary_footer}>
            <UiKitButton
              type="second"
              onClick={() => confirm.open().then(() => onRemove())}
            >
              Удалить
            </UiKitButton>
          </div>
        </>
      )}
    </div>
  );
}

export default UserSalary;
