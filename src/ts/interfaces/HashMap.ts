export default interface IHashMap<T> {
  [key: string | number]: T;
}

export type HashMap<T> = Map<string | number | undefined | null, T>;
