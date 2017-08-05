import { BuildStructs, Measure, Slice } from 'types/buildStructs';

export const dupSlices = (slices: Array<Slice>): Array<Slice> => {
  return slices.map( slice => {
    const positions = Object.assign([], slice.positions);
    return Object.assign({}, slice, { positions });
  });
};

export const dupMeasures = (measures: Array<Measure>): Array<Measure> => {
  return measures.map( measure => {
    const slices = dupSlices(measure.slices);
    return Object.assign({}, measure, { slices });
  });
};

export const dupBuildStructs = (structs: BuildStructs): BuildStructs => {
  const measures = dupMeasures(structs.measures);
  return Object.assign({}, structs, { measures });
};

export default dupBuildStructs;
