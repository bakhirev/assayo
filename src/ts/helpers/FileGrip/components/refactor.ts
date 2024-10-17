import { IDirtyFile } from 'ts/interfaces/FileInfo';

type ArrayIdFile = [string, IDirtyFile];

function isCorrectFile(file: IDirtyFile) {
  return !(
    file.action === 'D'
    || file.path.length < 3
    || !file.extension
    || { json: true, xml: true, md: true, config: true }[file.extension]
    || { test: true, config: true }[file.type]
  );
}

function getFilesByProperty(
  list: IDirtyFile[],
  property: string,
): ArrayIdFile[] {
  list.sort((a: IDirtyFile, b: IDirtyFile) => b[property] - a[property]);
  return list
    .slice(0, 20)
    .map((file: IDirtyFile) => [file.id, file]);
}


export default class FileGripByRefactor {
  files: IDirtyFile[] = [];

  updateTotalInfo(files: IDirtyFile[]) {
    const list = files.filter(isCorrectFile);
    const filesWithProblems = [
      ...getFilesByProperty(list, 'lines'),
      ...getFilesByProperty(list, 'totalDays'),
      ...getFilesByProperty(list, 'totalTasks'),
    ];

    const uniqueFilesWithProblems =  Array.from(
      (new Map<string, IDirtyFile>(filesWithProblems)).values(),
    ).filter((file: IDirtyFile) => (
      file.lines > 50 && file.totalDays > 10
    ));

    uniqueFilesWithProblems.sort((a: any, b: any) => b.totalDays - a.totalDays);

    this.files = uniqueFilesWithProblems;
  }

  clear() {
    this.files = [];
  }
}
