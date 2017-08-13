import { Library } from 'data/library/reducer';
import { Notation } from 'types/notation';

export const dupNotation = (notation: Notation): Notation => {
  const nextNotation = Object.assign({}, notation);
  nextNotation.tags = Object.assign([], notation.tags);
  return nextNotation;
};

const dupLibrary = (library: Library): Library => {
  const nextLibrary = { notations: [] };

  nextLibrary.notations = library.notations.map( notation => (
    dupNotation(notation)
  ));

  return nextLibrary;
};

export default dupLibrary;
