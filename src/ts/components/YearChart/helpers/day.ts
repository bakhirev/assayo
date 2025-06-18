export function getPercentByMax(count: number, max: number) {
  const value = ((count || 0) * 100) / max;
  return (value - value % 1) / 100;
}

export const COLORS = {
  WORKS: [
    '#4162B5', // 0 1
    '#617DC1', // 1 0.8
    '#718AC6', // 2 0.7
    '#8198CD', // 3 0.6
    '#91A6D2', // 4 0.5
    '#A2B3D8', // 5 0.4
    '#B2C1DE', // 6 0.3
    '#C2CEE4', // 7 0.2
  ],
  WEEKEND: [
    '#ED675F', // 1
    '#EB817C', // 0.8
    '#E98E8A', // 0.7
    '#E89B99', // 0.6
    '#E7A8A7', // 0.5
    '#E7B5B6', // 0.4
    '#E6C3C4', // 0.3
    '#E4CFD3', // 0.2
  ],
  SELECTED: [
    '#0E5C0C', // 1
    '#2B9829', // 0.8
    '#4FBF4C', // 0.7
    '#6DD26A', // 0.6
    '#88E185', // 0.5
    '#ACE4AA', // 0.4
    '#C2ECC1', // 0.3
    '#E1F7E1', // 0.2
  ],
};

export function getColor(colors: string[], opacity: number): string {
  if (opacity >= 0.8) return colors[1];
  if (opacity >= 0.6) return colors[3];
  if (opacity >= 0.4) return colors[5];
  return colors[7];
}

export function getDayWidth(wrapperWidth: number = 0) {
  const minMonthWidth = 7 + 8 * 16;
  const newMonthNumber = Math.floor(wrapperWidth / minMonthWidth);
  const step = 0.3;
  const borders = 7;
  for (let px = 16; px <= 24; px += step) {
    const monthWidth = borders + 8 * px;
    const size = monthWidth * newMonthNumber;
    if (size > wrapperWidth) return (px - step);
  }
  return 24;
}
