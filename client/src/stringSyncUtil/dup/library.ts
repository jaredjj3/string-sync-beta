export const dupNotation = (notation: any): any => {
  const nextNotation = Object.assign({}, notation);
  nextNotation.tags = Object.assign([], notation.tags);
  return nextNotation;
};

const dupLibrary = (library: any): any => {
  const nextLibrary = { notations: [] };

  nextLibrary.notations = library.map(notation => (
    dupNotation(notation)
  ));

  return nextLibrary;
};

export default dupLibrary;
