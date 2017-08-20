import dupBuildStructs from './buildStructs';
import dupScrollStructs from './scrollStructs';

import { Notation } from 'types/notation';

const  dupNotation = (notation: Notation): Notation => {
  const buildStructs = dupBuildStructs(notation.buildStructs);
  const scrollStructs = dupScrollStructs(notation.scrollStructs);

  return Object.assign({}, notation, { buildStructs, scrollStructs });
};

export default dupNotation;
