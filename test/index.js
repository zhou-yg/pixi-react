const _ = require('lodash');

global._ = _;

var testsContext = require.context('./', true, /slot_test\.js$/);
testsContext.keys().forEach(k => {
  testsContext(k);
});
