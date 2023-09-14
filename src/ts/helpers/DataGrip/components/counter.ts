export default class MinMaxCounter {
  min: number = Infinity;

  max: number = -Infinity;

  minData: any = undefined;

  maxData: any = undefined;

  update(value?: number, data?: any) {
    if (!value && value !== 0) return;
    if (this.min > value) {
      this.min = value;
      this.minData = data;
    }
    if (this.max < value) {
      this.max = value;
      this.maxData = data;
    }
  }

  clear() {
    this.min = Infinity;
    this.max = -Infinity;
    this.minData = undefined;
    this.maxData = undefined;
  }
}