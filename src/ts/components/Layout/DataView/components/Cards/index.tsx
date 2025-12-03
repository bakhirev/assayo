import React, { useLayoutEffect, useRef, useState } from 'react';

import { IColumn } from 'ts/components/Table/interfaces/Column';
import getDefaultProps from 'ts/components/Table/helpers/getDefaultProps';
import Card from './components/Card';

import getCardConfigs from './helpers/getCardConfigs';
import style from './styles/index.module.scss';

interface ICardsProps {
  items: any[];
  columnCount?: number;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

function Cards({
  items = [],
  className,
  columnCount,
  children,
}: ICardsProps): React.ReactElement | null {
  const [cardNumber, setCardNumber] = useState<number>(columnCount || 4);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  if (!items || !items.length) return null;

  const configs = getDefaultProps(children) as IColumn[];
  const lines = getCardConfigs(configs) as IColumn[];

  useLayoutEffect(() => {
    const width = ref?.current?.offsetWidth;
    let count = 4;
    if (width < 1100) count = 3;
    if (width < 850) count = 2;
    if (width < 700) count = 1;
    setCardNumber(columnCount || count);
  }, []);

  const cards = items?.map((item: any, index: number) => (
    <Card
      key={index}
      item={item}
      lines={lines}
      customStyle={[
        { width: 'calc(100% - 24px)' },
        { width: 'calc(50% - 24px)' },
        { width: 'calc(33.33% - 24px)' },
        { width: 'calc(25% - 24px)' },
      ][cardNumber - 1]}
      className={className}
    />
  ));

  return (
    <div
      ref={ref}
      className={style.card_wrapper}
    >
      {cards}
    </div>
  );
}

Cards.defaultProps = {
  items: [],
  className: undefined,
  columnCount: undefined,
};

export default Cards;
