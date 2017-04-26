var testsContext = require.context('./', true, /_test\.js$/);
testsContext.keys().forEach(k => {
  testsContext(k);
});
