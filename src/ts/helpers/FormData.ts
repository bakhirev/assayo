function getDeepCopy(obj: any): any {
  const copy = {};
  Object.keys(obj).forEach((property) => {
    const value = obj[property];
    const isObject = value
        && typeof value === 'object'
        && !(value instanceof Array);
    copy[property] = isObject ? getDeepCopy(value) : value;
  });
  return copy;
}

export default {
  getDeepCopy,
  getUpdatedFormData(
    formData: any,
    propertyName: string | string[],
    value: any,
  ) {
    const keys = this.getKeys(propertyName);
    const lastIndex = keys.length - 1;
    const copy = getDeepCopy(formData);
    let nextValue = copy;

    keys.forEach((key: string, index: number) => {
      if (index === lastIndex) {
        nextValue[key] = value;
      } else {
        if (!nextValue[key]) nextValue[key] = {};
        nextValue = nextValue[key];
      }
    });

    return copy;
  },
  getKeys(propertyName: string | string[]) {
    if (!propertyName) return [''];
    return Array.isArray(propertyName)
      ? propertyName
      : `${propertyName}`.split('.');
  },
  getValueByKeys(
    originData: any,
    propertyName: string | string[] = [],
  ) {
    const keys = this.getKeys(propertyName);
    return keys.length
      ? keys.reduce((data, key) => data?.[key], originData) ?? ''
      : '';
  },
};
