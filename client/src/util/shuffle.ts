const shuffle = <T>(array: Array<T>): Array<T> => {
  for (let i = array.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [array[i - 1], array[j]] = [array[j], array[i - 1]];
  }

  return array;
};

export default shuffle;
