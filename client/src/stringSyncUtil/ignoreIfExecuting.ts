const ignoreIfExecuting = callback => {
  let isExecuting = false;

  return async (...args) => {
    if (isExecuting) {
      return;
    }

    isExecuting = true;

    let returnValue = void 0;
    try {
      returnValue = await callback(...args);
    } finally {
      isExecuting = false;
    }

    return returnValue;
  };
};

export default ignoreIfExecuting;
