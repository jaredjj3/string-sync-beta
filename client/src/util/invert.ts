const invert = (object: object): object => {
  const inverted = {};
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      inverted[object[key]] = key;
    }
  }

  return inverted;
};

export default invert;
