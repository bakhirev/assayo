import IHashMap from '../HashMap';

export interface SourceDataPackage {
  name: string;
  version: string;
  license: string;
  dependencies: IHashMap<string>;
  devDependencies: IHashMap<string>;
}
