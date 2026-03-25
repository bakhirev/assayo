import ApplicationConfig from 'ts/interfaces/ApplicationConfig';

import { IPlugin } from '../interfaces/Plugin';

export default function getEnabledPlugins(
  plugins: IPlugin[],
  config: ApplicationConfig,
): IPlugin[] {
  const allowed = new Set(config.plugins);
  const forbidden = new Set(config.disabledPlugins);
  return plugins.filter(plugin => (
    plugin.id && allowed.has(plugin.id) && !forbidden.has(plugin.id)
  ));
}
