import {
  REF_DOMAIN_COUNTRY,
  REF_NEW_OLD_DOMAIN,
} from './getCountryByDomain';

const FAMILY = {
  ru: ['а', 'е', 'и', 'ivan', 'alexan', 'alexe', 'andre', 'anton', 'petr', 'konstan', 'sergey', 'dmitr', 'roman', 'pavel', 'vlad', 'nikol', 'nikita', 'maks', 'oleg', 'denis', 'viktor', 'victor', 'eugen', 'ikhail', 'italy', 'yura', 'igor', 'ov'],
  tr: ['ilmaz', 'aya', 'demir', 'elik', 'ahin', 'ildiz', 'ildirım'],
  pt: ['silva', 'santos', 'ferreira', 'pereira', 'oliveira', 'rodrigues', 'pereira', 'soares'],
  kr: ['kim', 'won', 'khan'],
  jp: ['sudzuki', 'yashi', 'kami', 'yuki', 'yama', 'sato', 'mato', 'moto', 'sawa', 'hiro'],
  uk: ['watson', 'thomson', 'smith', 'johnson', 'williams', 'jones', 'brown', 'davis', 'miller', 'wilson', 'moore', 'taylor'],
  es: ['ñ', 'gonzales', 'rodriguez', 'fernandez', 'garcia', 'lopez'],
  fr: ['blanchet', 'boucher', 'deschamps', 'dupont', 'fournier', 'garnier', 'laurent', 'lavigne', 'martin', 'monet'],
  it: ['rossi', 'ferrari', 'conti', 'romano', 'bruni', 'esposito', 'russo', 'marino', 'de luca', 'mancini'],
  pl: ['ł'],
  ee: ['õ'],
  gr: ['α', 'ε', 'о', 'υ', 'β', 'π'],
  de: ['ß'],
  il: ['ה', 'י', 'ו'],
};

const LINE = {
  '-12:00': { countries: ['us'] },
  '-11:00': { countries: ['us'] },
  '-10:00': { countries: ['us'] },
  '-09:30': { countries: ['pf'] },
  '-09:00': { countries: ['us'] },
  '-08:00': { countries: ['us'] },
  '-07:00': { countries: ['ca', 'us'] },
  '-06:00': { countries: ['ca', 'us', 'mx', 'hn', 'ni'] },
  '-05:00': {
    title: 'Canada or USA or Caribbean or Peru',
    countries: ['ca', 'us', 'jm', 'dm', 'pa', 'pe', 'cu', 'co'],
  },
  '-04:00': { countries: ['ca', 'us', 'South America'] },
  '-03:00': {
    countries: ['ar', 'br'],
    name: {
      ar: FAMILY.es,
      br: FAMILY.pt,
    },
  },
  '-02:00': { countries: ['br'] }, // not gl
  '-01:00': { countries: ['pt'] },
  '+00:00': {
    countries: ['pt', 'uk'],
    name: {
      pt: FAMILY.pt,
      uk: FAMILY.uk,
      ru: FAMILY.ru,
    },
  },
  '+01:00': {
    title: 'Europe',
    countries: [
      'uk', 'es', 'fr', 'de', 'it', 'ch', 'at', 'pl', 'be', 'li', 'rs', 'se', 'no', 'me', 'si', 'sk', 'dk', 'nl',
      'dz', 'ne', 'td', 'ao',
    ],
    name: {
      es: FAMILY.es,
      fr: FAMILY.fr,
      it: FAMILY.it,
      pl: FAMILY.pl,
      ee: FAMILY.ee,
      gr: FAMILY.gr,
      de: FAMILY.de,
    },
  },
  '+02:00': {
    title: 'Finland or Ukraine or Balkans or Israel',
    countries: [
      'fi', 'lv', 'lt', 'ee', 'ua', 'bg', 'gr', 'cy', 'il',
      'eg', 'ly', 'za',
    ],
    name: {
      es: FAMILY.es,
      pl: FAMILY.pl,
      ee: FAMILY.ee,
      il: FAMILY.il,
    },
  },
  '+03:00': {
    countries: ['ru', 'tr'],
    name: {
      ru: FAMILY.ru,
      tr: FAMILY.tr,
    },
  },
  '+03:30': { countries: ['ir'] },
  '+04:00': {
    countries: ['ru'],
  },
  '+04:30': { countries: ['af'] },
  '+05:00': {
    title: 'Yekaterinburg or Middle Asia or Pakistan',
    countries: ['ru', 'kz', 'uz', 'uz', 'kg', 'tm', 'tj', 'pk'],
    name: {
      ru: FAMILY.ru,
    },
  },
  '+05:30': { countries: ['in'] },
  '+05:45': { countries: ['np'] },
  '+06:00': { countries: ['ru'] },
  '+07:00': {
    countries: ['th', 'vn', 'id'],
    name: {
      ru: FAMILY.ru,
    },
  },
  '+08:00': {
    title: 'China or Philippines',
    countries: ['cn', 'ph', 'ml'],
  },
  '+09:00': {
    countries: ['kr', 'jp'],
    name: {
      kr: FAMILY.kr,
      jp: FAMILY.jp,
    },
  },
  '+09:30': { countries: ['au'] },
  '+10:00': {
    title: 'Australia',
    countries: ['au', 'ru'],
    name: {
      ru: FAMILY.ru,
    },
  },
  '+10:30': { countries: ['au'] },
  '+11:00': { countries: ['au'] }, // not ru
  '+12:00': { countries: ['nz'] },
  '+13:00': { countries: ['ws'] },
};

function updateLines() {
  let keys = Object.keys(LINE);
  keys.forEach((timezone: string, index: number) => {
    LINE[timezone].prev = LINE[(keys[index - 1] || '')]?.countries || [];
    LINE[timezone].next = LINE[(keys[index + 1] || '')]?.countries || [];
    if (!LINE[timezone].title) {
      LINE[timezone].title = LINE[timezone].countries.map((id: string) => REF_DOMAIN_COUNTRY[id] || id).join(' or ');
    }
  });
}
updateLines();

export default function getCountryByTimeZone(
  timeZone?: string,
  domain?: string,
  name?: string,
) {
  const data = LINE[timeZone || ''];
  if (!data) return '';

  if (data.countries.length === 1) {
    return REF_DOMAIN_COUNTRY[data.countries[0]];
  }

  if (domain && [
    ...data.prev,
    ...data.countries,
    ...data.next,
  ].indexOf(domain) !== -1) {
    const newDomain = REF_NEW_OLD_DOMAIN[domain || ''] || domain;
    return REF_DOMAIN_COUNTRY[newDomain];
  }

  if (name && data.name) {
    const family = name.toLowerCase();
    for (let key in data.name) {
      const hasSuffix = data.name[key].some((text: string) => family.indexOf(text) !== -1);
      if (hasSuffix) return REF_DOMAIN_COUNTRY[key];
    }
  }

  return data.title;
}
