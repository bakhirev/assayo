import React from 'react';

import Title from 'ts/components/Title';
import localization from 'ts/helpers/Localization';
import Recommendations from './index';

interface IRecommendationsWrapperProps {
  recommendations: any[];
}

function RecommendationsWrapper({
  recommendations,
}: IRecommendationsWrapperProps) {
  if (!recommendations.length) return null;

  const title = localization.get('recommendations.title');

  return (
    <>
      <Title title={title}/>
      <Recommendations recommendations={recommendations} />
    </>
  );
}


export default RecommendationsWrapper;
