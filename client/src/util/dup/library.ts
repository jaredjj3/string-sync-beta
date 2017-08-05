import { Library, Notation } from 'data/library/reducer';

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
