import getCountryByDomain from './getCountryByDomain';
import getDevice from './getDevice';

const PUBLIC_SERVICES = [
  'icloud',
  'google',
  'inbox',
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

const isIP = /([0-9]{1,3}(-|_|.)[0-9]{1,3}(-|_|.)[0-9]{1,3}(-|_|.)[0-9]{1,3})/;

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

function getCompanyAndDomainByEmail(email?: string) {
  const fullDomain = (email || '').split('@').pop() || '';
  const parts = fullDomain.split('.');
  const domain = parts.pop();
  const company = (parts.pop() || '').toUpperCase();
  return [company, domain];
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

export default function getInfoFromNameAndEmail(author?: string, email?: string) {
  const companyByAuthor = getCompanyByName(author);
  const [companyByEmail, domain] = getCompanyAndDomainByEmail(email);
  const country = getCountryByDomain(domain);
  const device = getDevice(companyByEmail);

  const companyName = companyByAuthor || companyByEmail || '';
  const isMailService = companyName.indexOf('MAIL') !== -1;
  const isInCorrect = isPublicService[companyName]
    || isMailService
    || isUserName(author, companyName)
    || isIP.test(companyName);
  const company = (!isInCorrect && !device) ? companyName : '';

  return { company, country, device };
}
