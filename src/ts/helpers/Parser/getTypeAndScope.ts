const POPULAR_TYPES = [
  'refactor',
  'feat',
  'chore',
  'code style',
  'style',
  'doc',
  'docs',
  'test',
  'update',
  'improve',
  'add',
  'remove',
  'delete',
  'optimize',
  'rename',
  'eslint',
  'fix',
];

const REPLACE_TYPES = {
  add: 'feat',
  remove: 'refactor',
  delete: 'refactor',
  update: 'refactor',
  improve: 'refactor',
  optimize: 'refactor',
  rename: 'refactor',
  eslint: 'style',
  'code style': 'refactor',
};

function getType(message: string) {
  const findType = POPULAR_TYPES.find((item: string) => message.indexOf(item) !== -1);
  return REPLACE_TYPES[findType || ''] || findType;
}

function getScope(message: string) {
  return message
    .replace(/[()]/gim, '')
    .split(',')
    .map((text: string) => text.trim())
    ?.[0];
}

export function getTypeAndScope(message: string, task: string) {
  let type = '';
  let scope = '';

  let formattedMessage = message.replace(task, '').toLowerCase();
  const messageParts = formattedMessage.split(':');

  if (messageParts.length > 1) {
    // JIRA-1234 type(scope): message
    [type, scope] = messageParts[0].split(/[()]/g).map(v => v.trim());
  }

  if (!type) {
    type = getType(message);
  }

  if (type && !scope && messageParts.length > 1) {
    // JIRA-1234 scope: message
    scope = getScope(messageParts[0].replace(type, ''));
  }
  if (type) { // @ts-ignore
    type = type.split(' ').shift();
  }
  return [type, scope];
}

// ABC-123, #123, gh-123
export function getTask(message: string) {
  return ((message || '').match(/(([A-Z]+-)|(#)|(gh-)|(GH-))([0-9]+)/gm) || [])[0] || '';
}

// ABC-123 => '123';
export function getTaskNumber(task?: string) {
  return (task || '').replace(/[^0-9]+/gim, '');
}
