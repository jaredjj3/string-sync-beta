const sortBy = <T>(array: Array<T>, prop: string | number): Array<T> => (
  array.sort((a, b) => a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0)
);

export default sortBy;
