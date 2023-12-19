import localization from 'ts/helpers/Localization';

export function getFormattedTitle(recommendation: any) {
  const { title } = recommendation;

  if (!Array.isArray(title)) {
    return title || '';
  }

  return  title.length > 1
    ? `${title[0]} +${title.length - 1}`
    : title[0];
}

export function getDescriptionText(recommendation?: any) {
  const { description } = recommendation;
  const descriptionArgs = recommendation?.arguments?.description;
  const list = Array.isArray(description)
    ? description
    : [description];

  return list.map((textId: string) => (
    localization.get(textId, descriptionArgs)
  )).join('\n');
}