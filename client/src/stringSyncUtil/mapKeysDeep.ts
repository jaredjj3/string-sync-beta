import { mapKeys, mapValues, isPlainObject } from 'lodash';

const mapKeysDeep = (obj, callback) => (
  mapValues(
    mapKeys(obj, callback),
    val => (isPlainObject(val) ? mapKeysDeep(val, callback) : val)
  )
);

export default mapKeysDeep;
