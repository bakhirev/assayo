import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UiKitTabs from 'ts/components/UiKit/components/Tabs';

import { TEAM, PERSON } from '../../helpers/menu';
import style from '../../styles/header.module.scss';

function TabHeader() {
  const tabs = useRef() as React.MutableRefObject<HTMLDivElement>;
  const navigate = useNavigate();
  const { type, page, userId } = useParams<any>();
  const options = type === 'team' ? TEAM : PERSON;
  const formattedOptions = options.filter((item: any) => item?.title);

  useEffect(() => {
    tabs?.current?.scrollTo(0, 0);
  }, [type]);

  return (
    <>
      <header className={style.header_with_tab}>
        <UiKitTabs
          ref={tabs}
          value={page}
          options={formattedOptions}
          onChange={(some: any) => {
            const url = type === 'person'
              ? `${some.link}${userId}`
              : some.link;
            navigate(url);
          }}
        />
      </header>
      <div className={style.light_header_gap} />
    </>
  );
}

export default TabHeader;
