import React from 'react';

import CardForPrint from 'ts/components/Recommendations/components/CardForPrint';
import { Title } from 'ts/components/Layout';

import style from './index.module.scss';

interface BlockProps {
  title: string;
  recommendations: any[];
}

function Block({
  title,
  recommendations,
}: BlockProps): React.ReactElement | null {
  const cards = recommendations?.map((recommendation: any) => (
    <CardForPrint
      key={recommendation.description}
      recommendation={recommendation}
    />
  ));

  if (!cards?.length) return null;

  return (
    <>
      <Title title={title}/>
      <div className={style.recommendations_page}>
        {cards}
      </div>
    </>
  );
}

export default Block;
