import ICommit, { COMMIT_TYPE } from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

interface Service {
  commits: number;
  type: string;
  from: string;
  to: string;
}

type SysCommit = ICommit & { commitType: string };

const IGNORE_TYPE = new Set([
  COMMIT_TYPE.MERGE,
  COMMIT_TYPE.AUTO_MERGE,
  COMMIT_TYPE.PR_GITLAB,
]);

export default class StatisticsByService {
  commits: HashMap<Service> = new Map();

  lastService: any = {};

  totalInfo: any = [];

  clear() {
    this.commits.clear();
    this.lastService = {};
    this.totalInfo = [];
  }

  addCommit(commit: SysCommit) {
    if (IGNORE_TYPE.has(commit.commitType)) return;

    if (this.lastService?.type === commit.commitType) {
      this.#updateCommitByService(commit);
    } else {
      this.#addCommitByService(commit);
    }
  }

  #updateCommitByService(commit: ICommit) {
    this.lastService.commits += 1;
    this.lastService.to = commit.timestamp;
  }

  #addCommitByService(commit: SysCommit) {
    this.lastService = {
      type: commit.commitType,
      commits: 1,
      from: commit.timestamp,
      to: commit.timestamp,
    };
    this.totalInfo.push(this.lastService);
  }

  updateTotalInfo() {
    this.totalInfo = this.totalInfo.filter(
      (service: Service) => (service.from !== service.to && service.commits > 10),
    );
    this.commits.clear();
  }
}
