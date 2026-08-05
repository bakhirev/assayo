import { HashMap } from 'ts/interfaces/HashMap';
import { SourceDataPackage } from 'ts/interfaces/SourceData';

export interface Package {
  id: string;
  title: string;
  versions: any;
  level: number;
  parentIds: any;
  materializedPaths: string[][];
  childrenIds: string[];
  parentIdsTotal: number;
  childrenIdsTotal: number;
  notUse: boolean;
}

export class StatisticsByPackages {
  data: HashMap<Package> = new Map();

  totalInfo: Package[] = [];

  totalInfoByName: HashMap<Package> = new Map();

  constructor() {
    this.clear();
  }

  clear() {
    this.data = new Map();
    this.totalInfoByName.clear();
    this.totalInfo = [];
  }

  addData(data: SourceDataPackage) {
    const key = data.name || '';
    const statistic = this.data.get(key);
    if (statistic) {
      this.#updateData(statistic, data);
    } else {
      this.#addNewData(key, data);
    }
  }

  #updateData(statistic: Package, data: SourceDataPackage) {
    statistic.versions.add(data.version);
  }

  #addNewData(id: string, data: SourceDataPackage) {
    const childrenIds = Object.keys(data.dependencies || {});
    this.data.set(id, {
      id,
      title: data.name,
      level: 0,
      versions: new Set([data.version]),
      parentIds: new Set(),
      materializedPaths: [[id]],
      childrenIds,
      parentIdsTotal: 0,
      childrenIdsTotal: childrenIds.length,
      notUse: true,
    });
  }

  updateTotalInfo() {
    const list = Array.from(this.data.values());
    const rootIds = new Set(this.data.keys());

    list.forEach((node) => {
      node.childrenIds.forEach((childrenId: string) => {
        rootIds.delete(childrenId);

        const children = this.data.get(childrenId);
        if (!children) return;
        children.materializedPaths = [];
        children.parentIds.add(node.id);
        children.parentIdsTotal = children.parentIds.size;
      });
    });

    list.forEach((node) => {
      node.parentIds = Array.from(node.parentIds);
    });

    this.totalInfo = list;
    const rootElements = Array.from(rootIds).map(id => this.data.get(id)) as Package[];
    this.#updateLevel(rootElements);

    for (let i = 0; i < 10; i++) {
      list.forEach((node) => {
        node?.childrenIds?.forEach((childrenId: string) => {
          const children = this.data.get(childrenId);
          if (children && children?.level <= node?.level) {
            children.level = node.level + 1;
          }
        });
      });
    }

    this.#updateSort();
    this.totalInfoByName = this.data;
    this.data = new Map();
  }

  #updateLevel(stack: Package[]) {
    const alreadyProcessed = new Set();
    while (stack.length) {
      const parent = stack.shift();
      parent?.childrenIds?.forEach((childrenId: string) => {
        const children = this.data.get(childrenId);
        if (!children) return;

        parent.materializedPaths.forEach((ids) => {
          children.materializedPaths.push([...ids, children.id]);
        });

        if (alreadyProcessed.has(childrenId)) return;
        alreadyProcessed.add(childrenId);

        const level = parent.level + 1;
        if (level > children.level) {
          children.level = level;
        }
        stack.push(children);
      });
    }
  }

  #updateSort() {
    this.totalInfo.sort((a: any, b: any) => {
      const level = a.level - b.level;
      if (level) return level;

      const childrenIdsTotal = b.childrenIdsTotal - a.childrenIdsTotal;
      if (childrenIdsTotal) return childrenIdsTotal;

      return b.parentIdsTotal - a.parentIdsTotal;
    });
  }
}
