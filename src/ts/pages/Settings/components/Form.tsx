import React from 'react';
import { observer } from 'mobx-react-lite';

import UiKitButtonMenu from 'ts/components/UiKit/components/ButtonMenu';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';

import UserSetting from './User';
import Salary from './Salary';
import Common from './Common';
import Filter from './Filter';

import { IEmployees } from '../interfaces/Setting';
import { getNewEmployeesSettings } from '../helpers/getEmptySettings';
import formStore from '../store/Form';
import style from '../styles/index.module.scss';

const SettingForm = observer((response: any): React.ReactElement | null => {
  const employees = formStore.state.employees;
  if (!response || !employees) return null;


  const selectedNames = employees.map((user: IEmployees) => user.name);
  const authors = dataGripStore.dataGrip.author.list
    .filter((title: string) => !selectedNames.includes(title))
    .map((title: string, id: number) => ({ id, title }));

  const users = formStore.state.employees.map((user: IEmployees) => (
    <UserSetting
      key={user.id}
      user={user}
      onChange={(newUser: any) => {
        const newEmployees = employees.map((setting: IEmployees) => setting.id === user.id ? newUser : setting);
        formStore.updateState('employees', newEmployees);
      }}
      onRemove={() => {
        const newEmployees = employees.filter((setting: IEmployees) => setting.id !== user.id);
        formStore.updateState('employees', newEmployees);
      }}
    />
  ));

  return (
    <PageWrapper>
      <PageColumn>
        <Filter />
        <Salary />
        <Common />
      </PageColumn>
      <PageColumn>
        <Title title="Индивидуальные настройки"/>
        {employees.length > 0 ? (
          users
        ) : (
          <NothingFound
            message="Индивидуальных настроек нет. Данные по всем сотрудникам вычисляются по общим параметрам."
          />
        )}
        {authors.length && (
          <div className={style.buttons_footer}>
            <UiKitButtonMenu
              options={authors}
              onClick={(user: any) => {
                formStore.updateState('employees', [
                  ...employees,
                  getNewEmployeesSettings(user?.title, formStore.state, selectedNames?.length),
                ]);
              }}
            >
              Добавить пользователя
            </UiKitButtonMenu>
          </div>
        )}
      </PageColumn>
    </PageWrapper>
  );
});

export default SettingForm;
