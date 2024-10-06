const PUBLIC_SERVICES = [
  'icloud',
  'google',
  'yahoo',
  'aol',
  'zoho',
  'outlook',
  'gmx',
  'tutanota',
  'vk',
  'ok',
  'ya',
  'yandex',
  'rambler',
  'github',
  'gitlab',
  'com',
  'me',
  'qq',
  'dev',
  'localhost',
];

const isPublicService = Object.fromEntries(
  Object.values(PUBLIC_SERVICES).map(key => [key.toUpperCase(), true]),
);

function getCompanyByName(author?: string): string {
  const tags = (author || '')
    .toUpperCase()
    .match(/(\[[^\]]+])/gim) || [];

  const companies = tags
    .map(v => v.replace(/([\[\]]+)/gim, '').trim().split(','))
    .flat(Infinity);

  return companies.length
    ? companies[0] as string
    : '';
}

function getCompanyByEmail(email?: string) {
  const domain = (email || '').split('@').pop() || '';
  const parts = domain.split('.');
  parts.pop();
  return (parts.pop() || '').toUpperCase();
}

function getClearText(text: string) {
  return (text || '')
    .replace(/(\[[^\]]])+/gim, '')
    .replace(/[\s\t._0-9]+/gim, '')
    .toLowerCase();
}

function isUserName(author?: string, company?: string): boolean {
  if (!author || !company) return false;

  const clearAuthor = getClearText(author);
  const clearCompany = getClearText(company);
  if (!clearAuthor || !clearCompany) return false;

  return !!clearAuthor.match(clearCompany);
}

function getCompany(author?: string, email?: string) {
  const company = getCompanyByName(author) || getCompanyByEmail(email) || '';
  const isMailService = company.indexOf('MAIL') !== -1;
  return isPublicService[company] || isMailService || isUserName(author, company)
    ? ''
    : company;
}

export default getCompany;
