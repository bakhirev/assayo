// alex1989, alex89, alex05, alex105
export default function getYearFromLogin(login: string) {
  const text = `${login}@`.match(/([^0-9][4-9][0-9][^0-9])|([^0-9]19[5-9][0-9][^0-9])|([^0-9]20[0-5][0-9][^0-9])/);
  if (!text) return 0;

  const currentYear = (new Date()).getFullYear();

  // 1989
  if (text[0].length === 6) {
    const value = parseInt(text[0].substring(1, 5), 10);
    return (currentYear - value) < 18 ? 0 : value;
  }

  // 89
  const short = text[0].substring(1, 3);
  const last = parseInt(short, 10);
  const current = currentYear - 2000;
  if (last > current) return 1900 + last;

  // 05
  const diff = current - last;
  if (diff < 18) return 0;

  return 2000 + last;
}
