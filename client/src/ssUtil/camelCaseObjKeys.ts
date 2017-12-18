import { camelCase, mapKeys } from 'lodash';
import { mapKeysDeep } from './';

const toCamelCase = (_, key) => camelCase(key);

const camelCaseObjKeys = (obj: object, deep: boolean): any => {
  if (deep) {
    return mapKeysDeep(obj, toCamelCase);
  } else {
    return mapKeys(obj, toCamelCase);
  }
};

export default camelCaseObjKeys;
