/* "Merge pull request #3 in repository from TASK-123-add-profile to master"
 * "Merge pull request #3 from facebook/compiler into master"
 * "Merge pull request #3 from facebook/compiler"
 */
export function getGithubPrInfo(text: string) {
  const json = (text || '')
    .replace(/["'\r\n]+/gim, '')
    .replace('#', '#": "')
    .replace(' in ', '", "in": "')
    .replace(' from ', '", "from": "')
    .replace(' to ', '", "to": "')
    .replace(' into ', '", "to": "');
  const data = JSON.parse(`{"${json}"}`);
  return [data['Merge pull request #'], data.in || '', data.from || '', data.to || ''];
}

/* "Merge pull request #265 from liis-dev-team/feature/add-project-to-documents"
/* "Merge branch 'J123456' into 'develop'" */
/* "Merge branch 'J123456' into develop" */
/* "Merge branch 'J123456' of ssh://server.com into develop" */
export function getGitlabPrInfo(text: string) {
  const [branch, server, toBranch] = text
    .replace(/(["'\r\n]+)|(Merge\sbranch\s)/gim, '')
    .split(/\s[a-z]+\s/g); // " of ", " into "

  return toBranch
    ? [branch, toBranch, server]
    : [branch, server, undefined]; // branch, toBranch
}
