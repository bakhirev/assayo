import { SourceDataGitLog, SourceDataDependencies, SourceDataPackage } from 'ts/interfaces/SourceData';

export default interface FileWithData {
  name: string;
  content: SourceDataDependencies | SourceDataGitLog | SourceDataPackage[] | string;
}
