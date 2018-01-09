import { toPath } from 'lodash';

const elvis = (source: any, pathString: string): any => {
  const path = toPath(pathString);
  
  if (!path) {
    return source;
  } else {
    const result = path.reduce((dest, key) => (
      typeof dest !== 'undefined' && dest !== null && dest[key]
    ), source);
    return typeof result === 'undefined' ? null : result;
  }
}

export default elvis;
