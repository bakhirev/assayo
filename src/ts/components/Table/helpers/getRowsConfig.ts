import IHashMap from 'ts/interfaces/HashMap';

import { IRowsConfig } from '../interfaces/Column';

export function getRowId(row: any, index: number) {
  return row?.id || row?.uuid || `${row?.title}-${index}`;
}

function getNewConfig(id: any): IRowsConfig {
  return {
    id: id,
    details: false,
    disabled: false,
  };
}

function getRowsConfig(
  rows: any[] = [],
  oldConfigs: IHashMap<IRowsConfig> = {},
): IHashMap<IRowsConfig> {
  const configs = {};

  rows.map((row: any, index: number) => {
    const id = getRowId(row, index);
    configs[id] = oldConfigs[id] || getNewConfig(id);
  });

  return configs;
}

export default getRowsConfig;
