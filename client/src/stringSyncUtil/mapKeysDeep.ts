import { mapKeys, mapValues, isObject } from 'lodash';

const mapKeysDeep = (obj, callback) => (
  mapValues(
    mapKeys(obj, callback),
    val => (isObject(val) ? mapKeysDeep(val, callback) : val)
  )
);

export default mapKeysDeep;
