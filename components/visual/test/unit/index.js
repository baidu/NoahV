// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /nvBubble.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you want coverage for
const srcContext = require.context('../../src', true, /^\.\/(?!styles.*?(\.less)?$)/);
srcContext.keys().forEach(srcContext);
