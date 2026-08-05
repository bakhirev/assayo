import FileWithData from './interfaces';

import FileGroupDependencies from './components/FileGroupDependencies';
import FileGroupGitLog from './components/FileGroupGitLog';
import FileGroupPackages from './components/FileGroupPackages';

import getCleanStringFromFuncWrapper from './getCleanStringFromFuncWrapper';

function getWrapper(file: any, content: any): FileWithData {
  return {
    name: file.name,
    content,
  };
}

function errorWrapper(file: any, error: Error): string {
  console.error(error);
  return '';
}

async function getFilesWithContent(files: any) {
  return Promise.all(
    files.map((file: any) =>
      file.text()
        .then((dirtyText: string) => {
          const text = getCleanStringFromFuncWrapper(dirtyText);
          const response = text[0] === '{' || text[0] === '['
            ? JSON.parse(text) || text
            : text;
          return getWrapper(file, response);
        })
        .catch((error: Error) => errorWrapper(file, error))),
  );
}

function getResponse(dependencies: any, gitLog: any, packages: any) {
  const response: any = {};
  if (dependencies.length) {
    response.dependencies = dependencies.get();
  }
  if (gitLog.length) {
    response.gitLog = gitLog.get();
  }
  if (packages.length) {
    response.packages = packages.get();
  }
  return response;
}

export default async function getDataFromFiles(files: any) {
  const filesWithContent = await getFilesWithContent(files);
  const dependencies = new FileGroupDependencies();
  const gitLog = new FileGroupGitLog();
  const packages = new FileGroupPackages();

  filesWithContent
    .filter(file => file.content)
    .forEach((file: FileWithData) => {
      if (dependencies.is(file)) dependencies.add(file);
      else if (packages.is(file)) packages.add(file);
      else gitLog.add(file);
    });

  return getResponse(dependencies, gitLog, packages);
}
