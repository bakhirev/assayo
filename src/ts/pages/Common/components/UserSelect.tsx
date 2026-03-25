import React from 'react';
import { observer } from 'mobx-react-lite';

import statisticStore from 'ts/store/Statistics';
import UiKitSelect from 'ts/components/UiKit/components/Select';
import UiKitButton from 'ts/components/UiKit/components/Button';
import localization from 'ts/helpers/Localization';

import style from '../styles/user.module.scss';

interface UserSelectProps {
  required?: boolean;
  userId: number;
  onChange: Function;
}

const UserSelect = observer(({ required, userId, onChange }: UserSelectProps): React.ReactElement => {
  const authors = statisticStore.statisticsByCommits.author.list;
  const options = authors.map((title: string, id: number) => ({ id, title }));
  if (!required) {
    options.unshift({ id: '', title: localization.get('page.common.filter.allUsers') });
  }

  return (
    <div className={style.user_select}>
      <UiKitButton
        mode="second"
        disabled={userId <= 0}
        onClick={() => {
          onChange(userId - 1);
        }}
      >
        «
      </UiKitButton>
      <UiKitSelect
        value={userId}
        options={options}
        className={style.user_name}
        onChange={(newUserId: string) => {
          onChange(newUserId);
        }}
      />
      <UiKitButton
        mode="second"
        disabled={userId >= (authors.length - 1)}
        onClick={() => {
          onChange(userId + 1);
        }}
      >
        »
      </UiKitButton>
    </div>
  );
});

export default UserSelect;
