const inChunksOf = <T>(size: number, array: Array<T>, callback: Function): Array<any> => {
  const chunked = Array(Math.ceil(array.length / size)).fill(null).map((_, i) => (
    array.slice(i * size, i * size + size)
  ));

  return chunked.map((chunk, i) => callback(chunk, i));
};

export default inChunksOf;
