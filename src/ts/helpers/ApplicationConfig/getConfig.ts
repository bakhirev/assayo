import ApplicationConfig from 'ts/interfaces/ApplicationConfig';

import getSummaryConfig from './getSummaryConfig';
import getParametersFromURL from './getParametersFromURL';

export default function getConfig(callback: (config: ApplicationConfig) => void) {
  const parameters = getParametersFromURL();

  if (!parameters?.config) {
    callback(getSummaryConfig(parameters));
    return;
  }

  fetch(parameters?.config)
    .then(response => response.json())
    .then(configFromBackend => {
      callback(getSummaryConfig(parameters, configFromBackend));
    })
    .catch(() => {
      callback(getSummaryConfig(parameters));
    });
}

