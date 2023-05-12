import React from 'react';

import UiKitButton from 'ts/components/UiKit/components/Button';
import confirm from 'ts/components/ModalWindow/store/Confirm';
import PageBox from 'ts/components/Page/Box';
import Title from 'ts/components/Title';

import { IEmployees, IEmployeesSalary } from '../interfaces/Setting';
import { getNewSalarySettings } from '../helpers/getEmptySettings';
import UserSalary from './UserSalary';
import formStore from '../store/Form';
import style from '../styles/index.module.scss';

interface IUserSettingProps {
  user: IEmployees;
  onChange: Function;
  onRemove: Function;
}

function UserSetting({
  user,
  onChange,
  onRemove,
}: IUserSettingProps) {
  const items = user.salary.map((salary: IEmployeesSalary, index: number) => (
    <UserSalary
      key={user.id}
      index={index + 1}
      salary={salary}
      onChange={(newSalary: any) => {
        onChange({
          ...user,
          salary: user.salary.map((setting: IEmployeesSalary) => setting.id === salary.id ? newSalary : setting),
        });
      }}
      onRemove={() => {
        onChange({
          ...user,
          salary: user.salary.filter((setting: IEmployeesSalary) => setting.id !== salary.id),
        });
      }}
    />
  ));

  return (
    <PageBox
      className={style.user}
      onRemove={() => confirm.open().then(() => onRemove())}
    >
      <Title
        title={user?.name || ''}
        className={style.user_title}
      />
      {items}
      <div className={style.user_footer}>
        <UiKitButton
          type="slim"
          onClick={() => {
            onChange({
              ...user,
              salary: [
                ...user.salary,
                getNewSalarySettings(formStore.state),
              ],
            });
          }}
        >
          Добавить трудовой договор
        </UiKitButton>
      </div>
    </PageBox>
  );
}

export default UserSetting;
