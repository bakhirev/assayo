import getCompanyDomainDevice from './getCompany';
import getCountryByTimeZone from './getCountryByTimeZone';

const cacheByAuthorId = new Map();
const cacheByAuthor = new Map();
const cacheByEmail = new Map();
const cacheByAuthorEmail = new Map();
const cacheForCompany = new Map();
const cacheForCountry = new Map();

export function clearRenameCache() {
  cacheByAuthorId.clear();
  cacheByAuthor.clear();
  cacheByEmail.clear();
  cacheByAuthorEmail.clear();
  cacheForCompany.clear();
  cacheForCountry.clear();
}

function getAuthorIdByName(name: string) {
  return name.toLowerCase().replace(/[\s\t.\-_]+/gm, '');
}

function getFormattedName(name: string) {
  return name
    .replace(/[.\-_]+/gm, ' ')
    .replace(/([a-z])([A-Z])/gm, '$1 $2')
    .trim();
}

interface Response {
  author: string;
  email: string;
  device: string;
  company: string;
  country: string;
}

export default function getEmailAuthor(
  parts: string[],
  timezone: string,
): Response {
  let author = parts[1] || '';
  let email = parts[2] || '';
  if (email.indexOf('@') === -1) email = '';

  // Company, domain, device
  const key = `${author}>${email}`;
  let data = cacheForCompany.get(key);
  if (!data) {
    data = getCompanyDomainDevice(author, email);
    cacheForCompany.set(key, data);
  }

  const {
    company,
    domain,
    device,
  } = data;

  // Country
  const countryKey = `${author}>${timezone}`;
  let country = cacheForCountry.get(countryKey);
  if (!country) {
    country = getCountryByTimeZone(timezone, domain, author);
    cacheForCountry.set(key, data);
  }

  const authorEmail = cacheByAuthorEmail.get(key);
  if (authorEmail) {
    author = authorEmail.author;
    email = authorEmail.email;
  } else {
    // Author, email
    const authorId = getAuthorIdByName(author);
    const authorById = cacheByAuthorId.get(authorId);
    if (authorId && authorById && authorById !== author) {
      // console.log(`PARSE WARNING: Rename "${author}" to "${authorById}"`);
      cacheByAuthorId.set(authorId, authorById);
      author = authorById;
    }

    const authorByEmail = cacheByEmail.get(email);
    if (email && authorByEmail && authorByEmail !== author) {
      // console.log(`PARSE WARNING: Rename "${author}" to "${authorByEmail}"`);
      cacheByEmail.set(email, authorByEmail);
      author = authorByEmail;
    }

    const emailByAuthor = cacheByAuthor.get(author);
    if (author && emailByAuthor && emailByAuthor !== email) {
      // console.log(`PARSE WARNING: Rename "${email}" to "${emailByAuthor}"`);
      cacheByAuthor.set(author, emailByAuthor);
      email = emailByAuthor;
    }

    const newAuthorId = getAuthorIdByName(author);
    author = getFormattedName(author);
    cacheByAuthorId.set(newAuthorId, author);
    cacheByEmail.set(email, author);
    cacheByAuthor.set(author, email);
    cacheByAuthorEmail.set(key, { author, email });
  }

  return {
    author,
    email,
    device,
    company,
    country,
  };
}
