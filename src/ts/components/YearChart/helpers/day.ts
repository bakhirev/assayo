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
