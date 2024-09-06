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
  const company = domain.split('.').shift() || '';
  return company.toUpperCase();
}

function getCompany(author?: string, email?: string) {
  const company = getCompanyByName(author) || getCompanyByEmail(email) || '';
  const isMailService = company.indexOf('MAIL') !== -1;
  return isPublicService[company] || isMailService
    ? ''
    : company;
}

export default getCompany;
