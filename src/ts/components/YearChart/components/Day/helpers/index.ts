export * from './color';
export * from './getContent';

export function getPercentByMax(count: number, max: number) {
  const value = ((count || 0) * 100) / max;
  return (value - value % 1) / 100;
}
