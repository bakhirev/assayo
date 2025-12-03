import React, { useState } from 'react';

import { IEmployeesSalary } from 'ts/interfaces/UserSetting';
import UiKitInputNumber from 'ts/components/UiKit/components/InputNumber';
import UiKitColumns from 'ts/components/UiKit/components/Columns';
import UiKitSwitch from 'ts/components/UiKit/components/Switch';
import UiKitButton from 'ts/components/UiKit/components/Button';
import UiKitDate from 'ts/components/UiKit/components/Date';
import confirm from 'ts/components/ModalWindow/store/Confirm';
import { Title } from 'ts/components/Layout';
import localization from 'ts/helpers/Localization';

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
        title={localization.get('page.settings.user.subTitle', index)}
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
              title="page.settings.user.from"
              value={salary?.from}
              onChange={(from: string) => {
                onChange({ ...salary, from });
              }}
            />
            <UiKitSwitch
              disabled
              title="page.settings.common.workDaysInWeek"
              value={salary.workDaysInWeek}
              options={[1, 2, 3, 4, 5, 6, 7]}
              onChange={(workDaysInWeek: number) => {
                onChange({ ...salary, workDaysInWeek });
              }}
            />
          </UiKitColumns>
          <UiKitColumns>
            <UiKitInputNumber
              title="page.settings.common.salary"
              value={salary?.value}
              onChange={(value: number) => {
                onChange({ ...salary, value });
              }}
            />
            <UiKitSwitch
              disabled
              title="page.settings.common.currency"
              value={salary?.currency}
              options={['RUB', 'USD', 'EUR']}
              onChange={(currency: string) => {
                onChange({ ...salary, currency });
              }}
            />
          </UiKitColumns>
          <UiKitColumns>
            <UiKitInputNumber
              title="page.settings.common.workDaysInYear"
              value={salary?.workDaysInYear}
              onChange={(workDaysInYear: number) => {
                onChange({ ...salary, workDaysInYear });
              }}
            />
            <UiKitInputNumber
              title="page.settings.common.vacationDaysInYear"
              value={salary?.vacationDaysInYear}
              onChange={(vacationDaysInYear: number) => {
                onChange({ ...salary, vacationDaysInYear });
              }}
            />
          </UiKitColumns>
          <div className={style.salary_footer}>
            <UiKitButton
              mode="second"
              onClick={() => confirm.open().then(() => onRemove())}
            >
              {localization.get('page.settings.form.remove')}
            </UiKitButton>
          </div>
        </>
      )}
    </div>
  );
}

export default UserSalary;
