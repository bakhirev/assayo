import React from 'react';
import { observer } from 'mobx-react-lite';

import CardForPrint from 'ts/components/Recommendations/components/CardForPrint';
import { Title, NothingFound } from 'ts/components/Layout';

import IHashMap from 'ts/interfaces/HashMap';
import { RECOMMENDATION_TYPES } from 'ts/helpers/recommendations';

import getRecommendationsByAuthor from '../../PageTeamAuthor/components/helpers/recommendations';
import getRecommendationsByScope from '../../PageTeamScope/components/helpers/recommendations';
import getRecommendationsByTypes from '../../PageTeamTypes/components/helpers/recommendations';
import getRecommendationsByMonth from '../../PageTeamMonth/components/helpers/recommendationsForTeam';
import getRecommendationsByHours from '../../PageTeamHours/components/helpers/recommendations';

import Block from './Block';

function getAllRecommendations() {
  return [
    ...getRecommendationsByAuthor(),
    ...getRecommendationsByScope(),
    ...getRecommendationsByTypes(),
    ...getRecommendationsByMonth(),
    ...getRecommendationsByHours(),
  ].filter((item: any) => item);
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

const Page = observer((): React.ReactElement => {
  const recommendations = getAllRecommendations();
  if (!recommendations?.length) return (<NothingFound/>);

  const groups = getGroups(recommendations);

  return (
    <>
      <Block
        title="plugin.team_recommendations.alert"
        recommendations={groups[RECOMMENDATION_TYPES.ALERT]}
      />
      <Block
        title="plugin.team_recommendations.warning"
        recommendations={groups[RECOMMENDATION_TYPES.WARNING]}
      />
      <Block
        title="plugin.team_recommendations.fact"
        recommendations={groups[RECOMMENDATION_TYPES.FACT]}
      />
      <Block
        title="plugin.team_recommendations.info"
        recommendations={groups[RECOMMENDATION_TYPES.INFO]}
      />
    </>
  );
});

export default Page;
