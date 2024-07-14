export function getRandom(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

export function shuffle(items: any[]): any[] {
  // @ts-ignore
  for (let j, x, i = items.length; i; j = parseInt(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x) {}
  return items;
}
