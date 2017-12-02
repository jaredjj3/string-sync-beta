import { camelCase, mapKeys } from 'lodash';
import { mapKeysDeep } from './';

const toCamelCase = str => camelCase(str);

const camelCaseObjKeys = (obj: object, deep: boolean): any => {
  if (deep) {
    return mapKeysDeep(obj, toCamelCase);
  } else {
    return mapKeys(obj, toCamelCase);
  }
};

export default camelCaseObjKeys;
