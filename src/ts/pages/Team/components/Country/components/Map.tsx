import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';

import dataGripStore from 'ts/store/DataGrip';

import SelectWithButtons from 'ts/components/UiKit/components/SelectWithButtons';
import UiKitCheckbox from 'ts/components/UiKit/components/Checkbox';
import TimeZoneMap from 'ts/components/TimeZoneMap';
import PageWrapper from 'ts/components/Page/Box';
import Title from 'ts/components/Title';
import { t } from 'ts/helpers/Localization';

import style from '../../../styles/country.module.scss';

function getOptions(companies: any[]) {
  const options = companies.map((item: any) => ({ id: item.company, title: item.company }));
  return [
    { id: '', title: t('page.common.filter.allUsers') },
    { id: Math.random(), title: 'Unknown' },
    ...options,
  ];
}

const CustomMap = observer(() => {
  const companies = dataGripStore.dataGrip.company.statistic;
  const companyOptions = useMemo(() => getOptions(companies), companies);

  const [company, setCompany] = useState<string>('');
  const [isStaff, setIsStaff] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isDismissed, setIsDismissed] = useState<boolean>(true);

  const authors = dataGripStore.dataGrip.author.statistic
    .filter((author: any) => {
      if (company && author.lastCompany !== company) return false;
      if (!isStaff && author.isStaff) return false;
      if (!isActive && !author.isDismissed && !author.isStaff) return false;
      if (!isDismissed && author.isDismissed && !author.isStaff) return false;
      return true;
    });

  return (
    <PageWrapper>
      <Title title="page.team.country.byTimezone"/>
      <TimeZoneMap authors={authors}/>
      <div  className={style.team_country_filter}>
        <UiKitCheckbox
          title="page.team.country.filters.active"
          className={style.team_country_filter_checkbox}
          value={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <UiKitCheckbox
          title="page.team.country.filters.dismissed"
          className={style.team_country_filter_checkbox}
          value={isDismissed}
          onChange={() => setIsDismissed(!isDismissed)}
        />
        <UiKitCheckbox
          title="page.team.country.filters.staff"
          className={style.team_country_filter_checkbox}
          value={isStaff}
          onChange={() => setIsStaff(!isStaff)}
        />
        <SelectWithButtons
          title="page.team.tree.filters.author"
          className={style.team_country_filter_select}
          value={company}
          options={companyOptions}
          onChange={(id: string) => setCompany(id)}
        />
      </div>
    </PageWrapper>
  );
});

export default CustomMap;
