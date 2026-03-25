import { HashMap } from 'ts/interfaces/HashMap';

interface IColor {
  first: string;
  second: string;
}

export default class ColorGenerator {
  static DEFAULT = '#D0D1D2';

  refColorByTitle: HashMap<IColor> = new Map();

  constructor(titles?: string[]) {
    if (!titles?.length) return;

    const colors = [
      '#7F9BE0', '#E9A5A1', '#C2ECC1', '#A7C0FF',
      '#75CCE0', '#EC95B6', '#4F69A9', '#824844',
      '#E0BE69', '#B2E069', '#A18BE0', '#FFC178',
      '#E2DA84', '#B6BAE9', '#D7D4B1', '#E0BA96',
      '#C0D79C', '#B6C5C9', '#9E98AD', '#AACFD8',
      '#BAB2D0', '#DCBAC7',
    ];

    titles.map((key, i) => {
      const index = i % 20;
      this.refColorByTitle.set(key, { first: colors[index], second: '#FFFFFF' });
    });
  }

  get(key: string): IColor {
    return this.refColorByTitle.get(key) || {
      first: ColorGenerator.DEFAULT,
      second: ColorGenerator.DEFAULT,
    };
  }
}
