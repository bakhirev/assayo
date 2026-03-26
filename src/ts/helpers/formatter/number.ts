export function get2Number(time: number) {
  return time < 10 ? `0${time}` : time;
}

export function getNumberOfDigits(value: number, numberOfDigits: number) {
  if (!numberOfDigits) return value >> 0;
  const module = 10 * numberOfDigits;
  return (value * module >> 0) / module;
}

export function getShortNumber(value: number) {
  if (value === Infinity || value === -Infinity) return '—';
  const module = value < 0 ? (value * -1) : value;
  const numberOfDigits = module < 15 ? 1 : 0;
  return getNumberOfDigits(value, numberOfDigits);
}
