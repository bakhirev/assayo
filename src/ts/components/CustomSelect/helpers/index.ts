function getStringFromObject(value: any) {
  return value?.title
    || value?.name
    || value?.label
    || value?.description
    || value?.value
    || value?.id
    || value?.uuid
    || value?.key
    || JSON.stringify(value);
}

function getIdFromObject(value: any, index: number) {
  return value?.id
    ?? value?.uuid
    ?? value?.key
    ?? index
    ?? getStringFromObject(value);
}

function getValue(
  value: any,
  formatter: (a: any, i?: number) => string,
) {
  const type = typeof value;
  if (type === 'boolean') return value ? 'yes' : 'no';
  if (type === 'number' || type === 'string') return value;
  if (!value) return '';

  return Array.isArray(value)
    ? value.map(formatter).join(', ')
    : formatter(value);
}

export function getTitle(value: any) {
  return getValue(value, getStringFromObject);
}

export function getId(value: any, index: number) {
  return getValue(value, (v: any) => getIdFromObject(v, index));
}

export function getOption(value: any, index: number) {
  return {
    id: getId(value, index),
    title: getTitle(value),
    source: value,
  };
}