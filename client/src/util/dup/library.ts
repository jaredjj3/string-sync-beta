import { Library } from 'data/library/reducer';

const dupLibrary = (library: Library): Library => {
  const nextLibrary = { notations: [] };

  nextLibrary.notations = library.notations.map( notation => {
    const nextNotation = Object.assign({}, notation);
    nextNotation.tags = Object.assign([], notation.tags);
    return nextNotation;
  });

  return nextLibrary;
};

export default dupLibrary;
