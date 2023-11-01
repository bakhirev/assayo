import React from 'react';
import { observer } from 'mobx-react-lite';

import { IEmployees } from 'ts/interfaces/UserSetting';
import UiKitButtonMenu from 'ts/components/UiKit/components/ButtonMenu';
import PageWrapper from 'ts/components/Page/wrapper';
import PageColumn from 'ts/components/Page/column';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';

import dataGripStore from 'ts/store/DataGrip';
import localization from 'ts/helpers/Localization';

import UserSetting from './User';
import Salary from './Salary';
import Common from './Common';
import Prefixes from './Prefixes';

import { getNewEmployeesSettings } from '../helpers/getEmptySettings';
import MailMap from './MailMap';
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
    <>
      <PageWrapper>
        <PageColumn>
          <Common />
          <Prefixes />
          <Salary />
        </PageColumn>
        <PageColumn>
          <Title title="page.settings.user.title"/>
          {employees.length > 0 ? (
            users
          ) : (
            <NothingFound message="page.settings.user.notFound" />
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
                {localization.get('page.settings.form.addEmployee')}
              </UiKitButtonMenu>
            </div>
          )}
        </PageColumn>
      </PageWrapper>
      <PageWrapper>
        <Title title="page.settings.mailmap"/>
        <MailMap />
      </PageWrapper>
    </>
  );
});

export default SettingForm;
