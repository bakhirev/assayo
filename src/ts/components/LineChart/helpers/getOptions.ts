import ColorGenerator from 'ts/helpers/ColorGenerator';
import { IOptions } from '../interfaces';

interface IOptionsProps {
  order?: string[];
  suffix?: string;
  other?: string;
  max?: number[] | number;
  limit?: number;
}

export default function getOptions({
  order,
  suffix,
  other,
  max,
  limit,
}: IOptionsProps): IOptions {
  return {
    max: max instanceof Array ? Math.max(...max) : (max || 100),
    order: order || [],
    suffix: suffix || 'коммитов',
    otherTitle: other || 'Остальные',
    color: order?.length ? (new ColorGenerator(order)) : null,
    limit: limit || 15,
  };
}
