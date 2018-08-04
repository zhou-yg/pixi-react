const _ = require('lodash');
const pixiLib = require('pixi-lib');

global._ = _;

global.pixiLib = pixiLib;

var testsContext = require.context('./', true, /_test\.js$/);
// var testsContext = require.context('./', true, /componentLifeCycle_test\.js$/);
testsContext.keys().forEach(k => {
  testsContext(k);
});
