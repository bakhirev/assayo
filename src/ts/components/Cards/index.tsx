import React from 'react';

import { IColumn } from 'ts/components/Table/interfaces/Column';
import getDefaultProps from 'ts/components/Table/helpers/getDefaultProps';
import Card from './components/Card';

import getCardConfigs from './helpers/getCardConfigs';
import style from './styles/index.module.scss';

interface ICardsProps {
  items: any[];
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

function Cards({
  items = [],
  className,
  children,
}: ICardsProps): React.ReactElement | null {
  if (!items || !items.length) return null;

  const configs = getDefaultProps(children) as IColumn[];
  const lines = getCardConfigs(configs) as IColumn[];

  const cards = items?.map((item: any, index: number) => (
    <Card
      key={index}
      item={item}
      lines={lines}
      className={className}
    />
  ));

  return (
    <div className={style.card_wrapper}>
      {cards}
    </div>
  );
}

Cards.defaultProps = {
  items: [],
  className: undefined,
};

export default Cards;
