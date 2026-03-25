import ICommit from 'ts/interfaces/Commit';
import { HashMap } from 'ts/interfaces/HashMap';

interface Server {
  url: string;
  commits: number;
  port: string;
  domain: string;
  protocol: string;
  hostname: string;
  from: number;
  to: number;
}

// ssh://github.com:team/simple
// github.com:team/simple
function getProtocolDomain(url: string): string[] {
  const portIndex = url.indexOf('//');
  const [protocol, fullDomain] = url.split(/\/+/g);
  return (portIndex === -1)
    ? ['', protocol]
    : [protocol, fullDomain];
}

// user:pass@example.com:80 -> [example.com, 80, user, pass]
function getHostnamePortLoginPass(text: string): string[] {
  const parts = (text || '').split(/[@:]/g);
  const hostname = parts[0] || '';
  const port = parts[1] || '';
  if (parts.length === 1) return [hostname];
  if (parts.length === 2) return [hostname, port];
  return [hostname, port, parts[2], parts[3]];
}

export default class StatisticsByServer {
  commits: HashMap<Server> = new Map();

  totalInfo: any = [];

  clear() {
    this.commits.clear();
    this.totalInfo = [];
  }

  addCommit(commit: ICommit) {
    if (!commit.server) return;
    const statistic = this.commits.get(commit.server);
    if (statistic) {
      this.#updateCommitByServer(statistic, commit);
    } else {
      this.#addCommitByServer(commit);
    }
  }

  #updateCommitByServer(statistic: any, commit: ICommit) {
    statistic.commits += 1;
    statistic.to = commit.timestamp;
  }

  #addCommitByServer(commit: ICommit) {
    let [protocol, fullDomain, hostname, port, domain] = ['', '', '', '', ''];

    // new URL not work for incorrect string. Use manual parser
    if (commit.server[0] !== '/') {
      [protocol, fullDomain] = getProtocolDomain(commit.server);
      [hostname, port] = getHostnamePortLoginPass(fullDomain);
      domain = hostname.split('.').slice(-2).join('.');
    }

    this.commits.set(commit.server, {
      url: commit.server,
      commits: 1,
      port,
      domain: domain || 'local',
      protocol: protocol.replace(':', '').toUpperCase(),
      hostname: hostname,
      from: commit.milliseconds,
      to: commit.milliseconds,
    });
  }

  updateTotalInfo() {
    const list = Array.from(this.commits.values());
    const groups = new Map();
    list.forEach((item) => {
      const group = groups.get(item.domain);
      if (group) {
        this.#updateServerGroup(group, item);
      } else {
        groups.set(item.domain, this.#getServerGroup(item));
      }
    });
    this.totalInfo = Array.from(groups.values());
    this.commits.clear();
  }

  #updateServerGroup(group: any, item: Server) {
    group.from = item.from < group.from ? item.from : group.from;
    group.to = item.to > group.to ? item.to : group.to;
    group.children.push(item);
  }

  #getServerGroup(item: Server) {
    return {
      domain: item.domain,
      from: item.from,
      to: item.to,
      children: [item],
    };
  }
}
