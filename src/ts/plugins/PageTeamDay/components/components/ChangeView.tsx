import React from 'react';
import { observer } from 'mobx-react-lite';

import { UiKitSwitch } from 'ts/components/UiKit';
import type Filter from 'ts/components/Layout/Search/interfaces/Filter';

import saveWorkLog from '../helpers/saveWorkLog';
import style from '../styles/index.module.scss';

interface ChangeViewProps {
  value?: string,
  filters?: Filter,
  content?: any[],
  onChange: (v: string) => void;
}

const ChangeView = observer(({
  value,
  content,
  filters,
  onChange,
}: ChangeViewProps) => {
  return (
    <div className={style.team_team_day_toolbar}>
      <UiKitSwitch
        value={value || 'custom'}
        className={style.team_team_day_toolbar_change_view}
        options={[
          { id: 'list', title: 'plugin.team_day.view.list' },
          { id: 'table', title: 'plugin.team_day.view.table' },
          { id: 'cards', title: 'plugin.team_day.view.cards' },
        ]}
        onChange={([view]: string[]) => onChange(view)}
      />
      <img
        alt=""
        src="./assets/icons/Download.svg"
        className={style.team_team_day_toolbar_download}
        onClick={() => {
          saveWorkLog(content || [], filters);
        }}
      />
    </div>
  );
});

export default ChangeView;
