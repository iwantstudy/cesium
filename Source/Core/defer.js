/**
 * A function used to resolve a promise upon completion of an asynchronous operation.
 * @callback defer.resolve
 *
 * @param {*} value The resulting value of an asynchronous operation.
 */

/**
 * A function used to reject a promise upon failure asynchronous operation.
 * @callback defer.reject
 *
 * @param {*} error The error which caused the asynchronous operation to fail.
 */

/**
 * An object which contains a promise object representing the eventual completion (or failure) of an asynchronous operation, and functions to resolve or reject the promise.
 *
 * @typedef {Object} defer.deferred
 * @property {defer.resolve} resolve Resolves the promise when called.
 * @property {defer.reject} reject Rejects the promise when called.
 * @property {Promise} promise Promise object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
 */

/**
 * Creates a deferred object, containing a promise object representing the eventual completion (or failure) of an asynchronous operation, and functions to resolve or reject the promise.
 * @returns {defer.deferred}
 */
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
