export function getWingsLevel(workedDays: number) {
  const month = Math.floor(workedDays / 30);
  return month < 36
    ? [
      0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, // 1 year
      4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, // 2 year
      8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, // 3 year
    ][month] : 9;
}

export function getWeaponLevel(tasksNumber: number) {
  if (tasksNumber > 500) return 6;
  if (tasksNumber > 300) return 5;
  if (tasksNumber > 200) return 4;
  if (tasksNumber > 100) return 3;
  if (tasksNumber > 50) return 2;
  if (tasksNumber > 25) return 1;
  return 0;
}