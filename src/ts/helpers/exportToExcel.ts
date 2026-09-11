/* eslint-disable no-bitwise */

const encoder = new TextEncoder();

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let crc = n;
    for (let k = 0; k < 8; k += 1) {
      crc = crc & 1 ? 0xEDB88320 ^ (crc >>> 1) : crc >>> 1;
    }
    table[n] = crc;
  }
  return table;
})();

function crc32(data: Uint8Array) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i += 1) {
    crc = CRC_TABLE[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function concat(parts: Uint8Array[]) {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  parts.forEach((part) => {
    output.set(part, offset);
    offset += part.length;
  });
  return output;
}

function u16(value: number) {
  return Uint8Array.of(value & 0xFF, (value >>> 8) & 0xFF);
}

function u32(value: number) {
  return Uint8Array.of(
    value & 0xFF,
    (value >>> 8) & 0xFF,
    (value >>> 16) & 0xFF,
    (value >>> 24) & 0xFF,
  );
}

function createZip(files: { name: string; content: string }[]) {
  const locals: Uint8Array[] = [];
  const centrals: Uint8Array[] = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const data = encoder.encode(file.content);
    const crc = crc32(data);
    const size = data.length;

    const local = concat([
      u32(0x04034B50),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(size),
      u32(size),
      u16(nameBytes.length),
      u16(0),
      nameBytes,
      data,
    ]);

    const central = concat([
      u32(0x02014B50),
      u16(20),
      u16(20),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(size),
      u32(size),
      u16(nameBytes.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBytes,
    ]);

    locals.push(local);
    centrals.push(central);
    offset += local.length;
  });

  const centralDir = concat(centrals);
  return concat([
    ...locals,
    centralDir,
    u32(0x06054B50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);
}

function escapeXml(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getColumnLetter(index: number) {
  let letter = '';
  let current = index + 1;
  while (current > 0) {
    const remainder = (current - 1) % 26;
    letter = `${String.fromCharCode(65 + remainder)}${letter}`;
    current = Math.floor((current - 1) / 26);
  }
  return letter;
}

function getCellXml(value: any, ref: string, hyperlinks: { ref: string; href: string }[]) {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return `<c r="${ref}"><v>${value}</v></c>`;
  }

  const dateParts = typeof value === 'string' ? /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value) : null;
  if (dateParts) {
    const serial = Math.round(Date.UTC(+dateParts[3], +dateParts[2] - 1, +dateParts[1]) / 86400000) + 25569;
    return `<c r="${ref}" s="2"><v>${serial}</v></c>`;
  }

  if (typeof value === 'object' && value.href) {
    hyperlinks.push({ ref, href: String(value.href) });
    const raw = String(value.text || value.href);
    const space = raw !== raw.trim() ? ' xml:space="preserve"' : '';
    return `<c r="${ref}" t="inlineStr" s="1"><is><t${space}>${escapeXml(raw)}</t></is></c>`;
  }

  const raw = String(value);
  const space = raw !== raw.trim() ? ' xml:space="preserve"' : '';
  return `<c r="${ref}" t="inlineStr"><is><t${space}>${escapeXml(raw)}</t></is></c>`;
}

function getSheetParts(data: any[][]) {
  const hyperlinks: { ref: string; href: string }[] = [];
  const rows = data.map((row: any[], rowIndex: number) => {
    const rowNumber = rowIndex + 1;
    const cells = (row || []).map((cell: any, cellIndex: number) => (
      getCellXml(cell, `${getColumnLetter(cellIndex)}${rowNumber}`, hyperlinks)
    )).join('');
    return `<row r="${rowNumber}">${cells}</row>`;
  }).join('');

  const lastRow = data.length;
  const lastCol = Math.max(...data.map((row: any[]) => (row ? row.length : 0)), 1);
  const dimension = `A1:${getColumnLetter(lastCol - 1)}${lastRow}`;
  const hyperlinksXml = hyperlinks.length
    ? `<hyperlinks>${hyperlinks.map((link, index) => (
      `<hyperlink ref="${link.ref}" r:id="rId${index + 1}"/>`
    )).join('')}</hyperlinks>`
    : '';

  const sheetXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<dimension ref="${dimension}"/>
<cols><col min="1" max="${lastCol}" width="20.0" customWidth="1"/></cols>
<sheetData>${rows}</sheetData>
${hyperlinksXml}
</worksheet>`;

  const relsXml = hyperlinks.length
    ? `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${hyperlinks.map((link, index) => (
    `<Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${escapeXml(link.href)}" TargetMode="External"/>`
  )).join('')}
</Relationships>`
    : '';

  return { sheetXml, relsXml };
}

export function getXMLForExcel(data: any) {
  if (!data || !data.length) return undefined;

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;

  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`;

  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets>
<sheet name="Assayo" sheetId="1" r:id="rId1"/>
</sheets>
</workbook>`;

  const workbookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;

  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="2">
<font><sz val="11"/><color theme="1"/><name val="Calibri"/><family val="2"/></font>
<font><sz val="11"/><color theme="10"/><name val="Calibri"/><family val="2"/><u/></font>
</fonts>
<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="3">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
<xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>
</cellXfs>
</styleSheet>`;

  const { sheetXml, relsXml } = getSheetParts(data);
  const files = [
    { name: '[Content_Types].xml', content: contentTypes },
    { name: '_rels/.rels', content: rootRels },
    { name: 'xl/workbook.xml', content: workbook },
    { name: 'xl/_rels/workbook.xml.rels', content: workbookRels },
    { name: 'xl/styles.xml', content: styles },
    { name: 'xl/worksheets/sheet1.xml', content: sheetXml },
  ];

  if (relsXml) {
    files.push({ name: 'xl/worksheets/_rels/sheet1.xml.rels', content: relsXml });
  }

  return createZip(files);
}
