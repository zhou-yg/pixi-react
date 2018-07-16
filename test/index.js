const _ = require('lodash');

global._ = _;

var testsContext = require.context('./', true, /_test\.js$/);
testsContext.keys().forEach(k => {
  testsContext(k);
});
