const cumulativeDays = [
  0, // Индекс 0 оставлен пустым для удобства: чтобы январь был под индексом 1
  31,   // Январь: прошло 31 день
  59,   // Февраль: 31 + 28
  90,   // Март: 59 + 31
  120,  // Апрель: 90 + 30
  151,  // Май: 120 + 31
  181,  // Июнь: 151 + 30
  212,  // Июль: 181 + 31
  243,  // Август: 212 + 31
  273,  // Сентябрь: 243 + 30
  304,  // Октябрь: 273 + 31
  334,  // Ноябрь: 304 + 30
  365   // Декабрь: 334 + 31
];

const cumulativeDaysLeap = [
  0, // Индекс 0 — заглушка
  31,   // Январь
  60,   // Февраль: 31 + 29 (вместо 59)
  91,   // Март: 60 + 31
  121,  // Апрель: 91 + 30
  152,  // Май: 121 + 31
  182,  // Июнь: 152 + 30
  213,  // Июль: 182 + 31
  244,  // Август: 213 + 31
  274,  // Сентябрь: 244 + 30
  305,  // Октябрь: 274 + 31
  335,  // Ноябрь: 305 + 30
  366   // Декабрь: 335 + 31
];

export default function getWeek(year: number, month: number, dayInMonth: number, day: number) {
  const dayInYear = (year % 100 === 0 ? year % 400 === 0 : year % 4 === 0)
    ? cumulativeDaysLeap[month] + dayInMonth
    : cumulativeDays[month] + dayInMonth;
  const ceilWeeks = dayInYear / 7 >> 0;
  const dayInJan = dayInYear - (ceilWeeks * 7) - day;
  const additionalDay = dayInJan > (day + 1) ? 1 : 0;
  const additionalWeek = dayInYear % 7 ? additionalDay : 0;
  return `${year}-W${(ceilWeeks + additionalWeek + 1) || 1}`;
}

