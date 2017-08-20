import { ScrollStructs } from 'types/scrollStructs';

const dupScrollStructs = (scrollStructs: ScrollStructs): ScrollStructs => (
  scrollStructs.map(struct => Object.assign({}, struct))
);

export default dupScrollStructs;
