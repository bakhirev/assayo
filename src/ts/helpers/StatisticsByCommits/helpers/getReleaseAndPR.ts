export interface ReleaseAndPR {
  releaseTitle: string;
  releaseDateMerge: string;
  prId: string;
  prExternalId: string;
  prDateMerge: string;
}

export default function getReleaseAndPR(
  task: any,
  statisticsByCommits: any,
  dateMerge?: number,
): ReleaseAndPR[] {
  if (!task) return [];

  const prByName = statisticsByCommits.pr.totalInfoByName;
  const releaseByName = statisticsByCommits.release.release;
  const releaseAndPR: any[] = [];

  task.releaseIds.forEach((releaseId: string) => {
    const release = releaseByName[releaseId];
    if (dateMerge && dateMerge > release.dateMerge) return;

    task.prIds.forEach((prId: number) => {
      if (!release.prIds.includes(prId)) return;

      const pr = prByName.get(prId);
      if (dateMerge && dateMerge > pr.dateMerge) return;

      releaseAndPR.push({
        releaseTitle: release.title,
        releaseDateMerge: release.dateMerge,
        prId,
        prExternalId: pr.prExternalId,
        prDateMerge: pr.dateMergeFull,
      });
    });
  });

  return releaseAndPR.reverse();
}


