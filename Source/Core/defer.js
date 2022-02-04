function defer() {
  let resolve;
  let reject;
  const promise = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });

  return {
    resolve: resolve,
    reject: reject,
    promise: promise,
  };
}

export default defer;
