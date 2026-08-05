export default function getCleanStringFromFuncWrapper(text: string) {
  const firstText = text.slice(0, 3);
  const isNeedClear = {
    'rep': true,
    'r(f': true,
    'R(f': true,
  }[firstText];
  if (isNeedClear) {
    text = text.replace(/(R\(f`)|(r\(f`)|(report\.push\(`)|(`\);)/gim, '');
  }
  return text;
}
