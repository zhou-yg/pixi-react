const _ = require('lodash');

global._ = _;

var testsContext = require.context('./', true, /_test\.js$/);
// var testsContext = require.context('./', true, /componentLifeCycle_test\.js$/);
testsContext.keys().forEach(k => {
  testsContext(k);
});
