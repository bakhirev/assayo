import IHashMap from '../HashMap';

export interface SourceDataDependency {
  package: string;
  imports: string[];
  usage: IHashMap<number>;
}

export type SourceDataDependencies = IHashMap<SourceDataDependency>;
