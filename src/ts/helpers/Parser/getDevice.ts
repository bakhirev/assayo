export default function getDevice(company?: string) {
  return company && (/(MACBOOK)|(-AIR)|(-IMAC)/gi).test(company)
    ? 'MacBook'
    : '';
}
