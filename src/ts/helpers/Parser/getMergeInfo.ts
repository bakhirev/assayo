// "Merge pull request #3 in repository from TASK-123-add-profile to master"
// "Merge pull request #3 from facebook/compiler into master"
// "Merge pull request #3 from facebook/compiler"
export function getGithubPrInfo(text: string) {
  const json = (text || '')
    .replace(/"/gim, '')
    .replace('#', '#": "')
    .replace(' in ', '", "in": "')
    .replace(' from ', '", "from": "')
    .replace(' to ', '", "to": "')
    .replace(' into ', '", "to": "');
  const data = JSON.parse(`{"${json}"}`);
  return [data['Merge pull request #'], data.in, data.from, data.to];
}
