export function getStringWithCapitalLetter(text?: string) {
  const formattedText = text || '';
  const firstSymbol = formattedText?.[0]?.toUpperCase() || '';
  return `${firstSymbol}${formattedText?.slice(1) || ''}`;
}
