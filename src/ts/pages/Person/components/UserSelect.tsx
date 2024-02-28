import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';
import UiKitSelect from 'ts/components/UiKit/components/Select';
import UiKitButton from 'ts/components/UiKit/components/Button';

import style from '../styles/index.module.scss';

const UserSelect = observer((): React.ReactElement => {
  const { type, page, userId } = useParams<any>();
  const navigate = useNavigate();

  const formattedUserId = parseInt(userId || '0', 10) || 0;
  const authors = dataGripStore.dataGrip.author.list;
  const options = authors.map((title: string, id: number) => ({ id, title }));

  return (
    <div className={style.user_select}>
      <UiKitButton
        mode="second"
        disabled={formattedUserId <= 0}
        onClick={() => {
          navigate(`/${type}/${page}/${formattedUserId - 1}`);
        }}
      >
        «
      </UiKitButton>
      <UiKitSelect
        value={formattedUserId}
        options={options}
        className={style.user_name}
        onChange={(newUserId: string) => {
          navigate(`/${type}/${page}/${newUserId}`);
        }}
      />
      <UiKitButton
        mode="second"
        disabled={formattedUserId >= (authors.length - 1)}
        onClick={() => {
          navigate(`/${type}/${page}/${formattedUserId + 1}`);
        }}
      >
        »
      </UiKitButton>
    </div>
  );
});

export default UserSelect;
