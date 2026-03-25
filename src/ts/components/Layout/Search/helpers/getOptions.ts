import { useTranslation } from 'ts/components/Translation';

export default function getOptions(
  title: string,
  list: any[],
  property?: string,
) {
  const { text } = useTranslation();
  const options = property
    ? list.map((item: any) => ({ id: item[property], title: item[property] }))
    : list.map((id: string) => ({ id, title: id }));

  return [
    { id: '', title: text(title) },
    ...(options.filter((item) => item.id)),
  ];
}
