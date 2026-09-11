import applicationConfig from 'ts/store/ApplicationConfig';

function getHref(prefix: string, id?: string) {
  if (!id) return '';
  const formattedId = id[0] === '#'
    ? id.replace('#', '')
    : id;
  return `${prefix}${formattedId}`;
}

export function getTaskHref(task?: string) {
  return getHref(applicationConfig?.config?.prefixForTask || '/', task);
}

export function getPRHref(prId?: string) {
  return getHref(applicationConfig?.config?.prefixForPR || '/', prId);
}
