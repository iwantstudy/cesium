import { defaultValue, getTimestamp, defer } from "../Source/Cesium.js";

function pollToPromise(f, options) {
  options = defaultValue(options, defaultValue.EMPTY_OBJECT);

  const pollInterval = defaultValue(options.pollInterval, 1);
  const timeout = defaultValue(options.timeout, 5000);

  const deferred = defer();

  const startTimestamp = getTimestamp();
  const endTimestamp = startTimestamp + timeout;

  function poller() {
    let result = false;
    try {
      result = f();
    } catch (e) {
      deferred.reject(e);
      return;
    }

    if (result) {
      deferred.resolve();
    } else if (getTimestamp() > endTimestamp) {
      deferred.reject(
        new Error(`Timeout - function did not complete within ${timeout}ms`)
      );
    } else {
      setTimeout(poller, pollInterval);
    }
  }

  poller();

  return deferred.promise;
}
export default pollToPromise;
