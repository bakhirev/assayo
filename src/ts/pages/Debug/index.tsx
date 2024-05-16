import React from 'react';

import localization from 'ts/helpers/Localization';
import CardForPrint from 'ts/components/Recommendations/components/CardForPrint';
import ACHIEVEMENT_LIST from 'ts/helpers/achievement/constants/list';

import Achievement from 'ts/components/Achievement/components/Item';
import Title from 'ts/components/Title';

function getFlatRecommendations(translations: any, list: any[] = []) {
  if (!translations) return list;

  for (let key in translations) {
    const item = translations[key];
    if (item?.title) {
      list.push(item);
    } else if (typeof item === 'string') {
      list.push({ title: item });
    } else {
      getFlatRecommendations(item, list);
    }
  }

  return list;
}

function DebugPage() {
  const translations = localization.translations[localization.language];
  const recommendations = getFlatRecommendations(translations.recommendations)
    .map((recommendation: any) => (
      <CardForPrint
        key={recommendation[1]}
        recommendation={recommendation}
      />
    ));

  const achievements = Object
    .entries(ACHIEVEMENT_LIST)
    .sort((a, b) => a[1] - b[1])
    .map(([code]: [string, number]) => (
      <Achievement
        key={code}
        code={code}
      />
    ));

  return (
    <>
      <Title title="page.person.achievement.title"/>
      <div style={{ columnCount: 3, marginBottom: '24px' }}>
        {achievements}
      </div>
      <section>
        {recommendations}
      </section>
    </>
  );
}

export default DebugPage;
