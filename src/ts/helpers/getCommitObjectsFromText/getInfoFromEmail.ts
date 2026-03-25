import { EmailType } from 'ts/interfaces/Commit';
import getYearFromLogin from './getYearFromLogin';

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
  // 'com',
  'me',
  'qq',
  'bk',
  // 'dev',
  'list',
  // 'localhost',
];

const isPublicService = Object.fromEntries(
  Object.values(PUBLIC_SERVICES).map(key => [key.toUpperCase(), true]),
);

const isIP = /(\.local)|(localhost)|(([0-9]{1,3}([-_\.])[0-9]{1,3}([-_\.])[0-9]{1,3}([-_\.])[0-9]{1,3}))/i;
const isGitHub = /(github)|(gitlab)/i;

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

export default function getInfoFromNameAndEmail(author?: string, email?: string) {
  const companyByAuthor = getCompanyByName(author);

  // alex1989@mail.ru
  const [login, server] = (email || '').split('@'); // alex1991, mail.ru
  const parts = (server || '').split('.'); // mail, ru
  const domain = parts[parts.length - 1]; // ru
  const companyByEmail = (parts[parts.length - 2] || '').toUpperCase(); // MAIL

  const isMailService = companyByEmail.indexOf('MAIL') !== -1 || isPublicService[companyByEmail];
  const device = (/(MACBOOK)|(-AIR)|(-IMAC)/gi).test(email || '')
    ? 'MacBook'
    : '';

  // getEmailType
  let emailType = EmailType.UNKNOWN;
  if (isMailService) {
    emailType = EmailType.MAIL;
  } else if (device) {
    emailType = EmailType.DEVICE;
  } else if (isIP.test(email || '')) {
    emailType = EmailType.NETWORK;
  } else if (isGitHub.test(server || '')) {
    emailType = EmailType.GITHUB;
  } else if (parts.length > 2) {
    emailType = EmailType.ACCOUNT;
  } else if (companyByEmail && parts.length == 2) {
    emailType = EmailType.COMPANY;
  }

  // getYearOfBirth
  const yearOfBirth = emailType === EmailType.MAIL
    ? getYearFromLogin(login)
    : 0;

  // getGithubLogin
  const githubLogin = emailType === EmailType.GITHUB
    ? login.split('+').pop() // 123456789+bakhirev
    : '';

  // getCompanyName
  let company = '';
  if (companyByAuthor) {
    company = companyByAuthor;
  } else if (emailType === EmailType.COMPANY || emailType === EmailType.ACCOUNT) {
    company = (/(dev)|(local)|(prod)/i).test(companyByEmail) || parts.length > 2
      ? ''
      : companyByEmail;
  }

  return { company, domain, device, emailType, yearOfBirth, githubLogin };
}
