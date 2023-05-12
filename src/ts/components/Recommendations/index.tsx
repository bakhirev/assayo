import React, { useLayoutEffect, useRef, useState } from 'react';

import Card from './components/Card';
import style from './styles/index.module.scss';

interface IRecommendationsProps {
  recommendations: any[];
}

function Recommendations({
  recommendations,
}: IRecommendationsProps) {
  const [maxCardsOnDisplay, setMaxCardsOnDisplay] = useState<number>(5);
  const [isOpen, setOpen] = useState<boolean>(false);
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    const width = ref?.current?.offsetWidth;
    const placeForCard = (width - 30) / (220 + 24);
    setMaxCardsOnDisplay(placeForCard);
  }, []);

  const className = isOpen
    ? style.recommendations_full
    : style.recommendations_short;

  const children = (recommendations || [])
    .filter(item => item)
    .map((recommendation) => (
      <Card
        key={recommendation[1]}
        recommendation={recommendation}
      />
    ));
  const visibleChildren = children.slice(0, isOpen ? Infinity : maxCardsOnDisplay);

  if (!children.length) return null;

  return (
    <div
      ref={ref}
      className={className}
    >
      {isOpen ? children : visibleChildren}
      {!isOpen && children.length > maxCardsOnDisplay && (
        <div
          className={style.more}
          onClick={() => {
            setOpen(true);
          }}
        >
          »
        </div>
      )}
    </div>
  );
}


export default Recommendations;
