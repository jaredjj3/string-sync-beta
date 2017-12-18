import { merge } from 'lodash';

const dup = notations => notations.map(notation => merge({}, notation));

export default dup;
