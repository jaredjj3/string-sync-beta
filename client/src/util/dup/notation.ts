import dupScrollStructs from './scrollStructs';

import { Notation } from 'types/notation';

const  dupNotation = (notation: Notation): Notation => {
  return Object.assign({}, notation);
};

export default dupNotation;
