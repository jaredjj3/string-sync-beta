import { camelCase } from 'lodash';

const camelCaseObjKeys = (obj) => (
  Object.keys(obj).reduce((camelCaseObj, key) => (camelCaseObj[camelCase(key)] = obj[key]), {})
);

export default camelCaseObjKeys;
