import { toPath } from 'lodash';

const elvis = (source: any, pathString: string): any => {
  const path = toPath(pathString);
  
  if (!path) {
    return source;
  } else {
    const result = path.reduce((dest, key) => dest && dest[key], source);
    return result || null;
  }
}

export default elvis;
