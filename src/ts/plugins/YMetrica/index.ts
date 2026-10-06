import { IPlugin } from 'ts/helpers/Plugins/interfaces/Plugin';


export default class Plugin implements IPlugin {
  static id = 'yMetric';

  dependencies = [];

  constructor() {
    if (['localhost', 'github.com'].includes(location.hostname)) return;
    if ((Math.random() * 100 >> 0) < 5) return;
  }
}
