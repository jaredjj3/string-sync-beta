// https://github.com/coleww/each-cons
const range = <T>(array: Array<T>, i: number, num: number): Array<T> => {
  const result = [];
  for (let j = 0; j < num; j++) {
    result.push(array[i + j]);
  }
  return result;
};

type EachConsCb = (element: any) => void;

const eachCons = (array: Array<any>, num: number, callback: EachConsCb): void => {
  const consecutives = [];
  for (let i = 0; i < array.length - num + 1; i++) {
    consecutives.push(range(array, i, num));
  }
  consecutives.forEach(callback);
};

export default eachCons;
