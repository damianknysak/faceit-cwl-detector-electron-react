export const renameKeysRecursive = (
  obj: any,
  keysMap: { [key: string]: string },
): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const newObj: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const newKey = keysMap[key] || key;
    newObj[newKey] = renameKeysRecursive(obj[key], keysMap);
  }

  return newObj;
};
