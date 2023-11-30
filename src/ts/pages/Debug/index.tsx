import React from 'react';

import localization from 'ts/helpers/Localization';
import Description from 'ts/components/Description';

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
    .map((item: any) => (
      <div key={`${item.title}`}>
        <Description
          text={`
            # ${localization.get(item.title)}
            ${localization.get(item.description)}
          `}
        />
      </div>
    ));

  console.dir(recommendations);
  return (
    <section>
      {recommendations}
    </section>
  );
}

export default DebugPage;
