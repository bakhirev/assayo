import ColorGenerator from './ColorGenerator';
import { IOptions } from '../interfaces';

interface IOptionsProps {
  order?: string[];
  suffix?: string;
  other?: string;
  max?: number[] | number;
  limit?: number;
  formatter?: Function;
}

export default function getOptions({
  order,
  suffix,
  other,
  max,
  limit,
  formatter,
}: IOptionsProps): IOptions {
  return {
    max: max instanceof Array ? Math.max(...max) : (max || 100),
    order: order || [],
    suffix: suffix ?? 'commits',
    otherTitle: other ?? '...',
    color: order?.length ? (new ColorGenerator(order)) : null,
    limit: limit || 15,
    formatter: formatter || ((v: any) => v),
  };
}
