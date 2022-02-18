import addDefaultMatchers from "./addDefaultMatchers.js";
import equalsMethodEqualityTester from "./equalsMethodEqualityTester.js";

function customizeJasmine(
  env,
  includedCategory,
  excludedCategory,
  webglValidation,
  webglStub,
  release
) {
  // set this for uniform test resolution across devices
  window.devicePixelRatio = 1;

  window.specsUsingRelease = release;

  const originalDescribe = window.describe;

  window.describe = function (name, suite, categories) {
    // exclude this spec if we're filtering by category and it's not the selected category
    // otherwise if we have an excluded category, exclude this test if the category of this spec matches
    if (includedCategory && categories !== includedCategory) {
      return;
    } else if (excludedCategory && categories === excludedCategory) {
      return;
    }

    originalDescribe(name, suite, categories);
  };

  // Override beforeEach(), afterEach(), beforeAll(), afterAll(), and it() to automatically
  // call done() when a returned promise resolves.
  const originalIt = window.it;

  window.it = function (description, f, timeout, categories) {
    originalIt(
      description,
      function (done) {
        const result = f(done);
        Promise.resolve(result)
          .then(function () {
            done();
          })
          .catch(function (e) {
            done.fail(e);
          });
      },
      timeout,
      categories
    );
  };

  const originalBeforeEach = window.beforeEach;

  window.beforeEach = function (f) {
    originalBeforeEach(function (done) {
      const result = f(done);
      Promise.resolve(result)
        .then(function () {
          done();
        })
        .catch(function (e) {
          done.fail(e);
        });
    });
  };

  const originalAfterEach = window.afterEach;

  window.afterEach = function (f) {
    originalAfterEach(function (done) {
      const result = f(done);
      Promise.resolve(result)
        .then(function () {
          done();
        })
        .catch(function (e) {
          done.fail(e);
        });
    });
  };

  const originalBeforeAll = window.beforeAll;

  window.beforeAll = function (f) {
    originalBeforeAll(function (done) {
      const result = f(done);
      Promise.resolve(result)
        .then(function () {
          done();
        })
        .catch(function (e) {
          done.fail(e);
        });
    });
  };

  const originalAfterAll = window.afterAll;

  window.afterAll = function (f) {
    originalAfterAll(function (done) {
      const result = f(done);
      Promise.resolve(result)
        .then(function () {
          done();
        })
        .catch(function (e) {
          done.fail(e);
        });
    });
  };

  if (webglValidation) {
    window.webglValidation = true;
  }

  if (webglStub) {
    window.webglStub = true;
  }

  //env.catchExceptions(true);

  env.beforeEach(function () {
    addDefaultMatchers(!release).call(env);
    env.addCustomEqualityTester(equalsMethodEqualityTester);
  });
}
export default customizeJasmine;
