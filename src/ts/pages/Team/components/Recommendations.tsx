import React from 'react';
import { observer } from 'mobx-react-lite';

import CardForPrint from 'ts/components/Recommendations/components/CardForPrint';
import NothingFound from 'ts/components/NothingFound';
import Title from 'ts/components/Title';

import IHashMap from 'ts/interfaces/HashMap';
import dataGripStore from 'ts/store/DataGrip';
import { RECOMMENDATION_TYPES } from 'ts/helpers/Recommendations/helpers/contstants';
import style from '../styles/recommendations.module.scss';

function getAll(recommendations: IHashMap<any>) {
  return Object.values(recommendations)
    .flat(1)
    .filter((item: any) => item);
}

function getGroups(recommendations: any[]) {
  return recommendations.reduce((acc: IHashMap<any>, item: any) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});
}

interface BlockProps {
  title: string;
  recommendations: any[];
}

function Block({
  title,
  recommendations,
}: BlockProps): React.ReactElement | null {
  const cards = recommendations.map((recommendation: any) => (
    <CardForPrint
      key={recommendation.description}
      recommendation={recommendation}
    />
  ));

  if (!cards.length) return null;

  return (
    <>
      <Title title={title}/>
      <div className={style.recommendations_page}>
        {cards}
      </div>
    </>
  );
}

const RecommendationsPage = observer((): React.ReactElement => {
  const all = getAll(dataGripStore.dataGrip.recommendations.team);
  if (!all?.length) return (<NothingFound/>);

  const groups = getGroups(all);

  return (
    <>
      <Block
        title="page.team.recommendations.alert"
        recommendations={groups[RECOMMENDATION_TYPES.ALERT]}
      />
      <Block
        title="page.team.recommendations.warning"
        recommendations={groups[RECOMMENDATION_TYPES.WARNING]}
      />
      <Block
        title="page.team.recommendations.fact"
        recommendations={groups[RECOMMENDATION_TYPES.FACT]}
      />
      <Block
        title="page.team.recommendations.info"
        recommendations={groups[RECOMMENDATION_TYPES.INFO]}
      />
    </>
  );
});

export default RecommendationsPage;
