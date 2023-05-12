import IHashMap from '../interfaces/HashMap';

interface IColor {
  first: string;
  second: string;
}

export default class ColorGenerator {
  static DEFAULT = '#D0D1D2';

  refColorByTitle: IHashMap<IColor> = {};

  constructor(titles: string[]) {
    const colors = [
      '#7F9BE0', '#E9A5A1', '#C2ECC1', '#B6BAE9', '#A18BE0',
      '#FFC178', '#75CCE0', '#B2E069', '#EC95B6', '#E2DA84',
      '#A7C0FF', '#D7D4B1', '#E0BA96', '#E0BE69', '#C0D79C',
      '#B6C5C9', '#9E98AD', '#AACFD8', '#BAB2D0', '#DCBAC7',
    ];

    this.refColorByTitle = Object.fromEntries(
      titles.map((v, i) => [v, { first: colors[i], second: '#FFFFFF' }]),
    );
  }

  get(key: string): IColor {
    return this.refColorByTitle[key] || ColorGenerator.DEFAULT;
  }
}
