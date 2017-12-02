const ignoreIfExecuting = (callback) => {
  let isExecuting = false;

  return (...args) => {
    if (isExecuting) {
      return;
    }

    isExecuting = true;

    try {
      callback(...args);
    } finally {
      isExecuting = false;
    }
  };
};

export default ignoreIfExecuting;
