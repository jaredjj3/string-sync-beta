import dupScrollStructs from './scrollStructs';

import { Notation } from 'types/notation';

const  dupNotation = (notation: Notation): Notation => {
  const tags = Object.assign([], notation.tags);
  return Object.assign({}, notation, { tags });
};

export default dupNotation;
