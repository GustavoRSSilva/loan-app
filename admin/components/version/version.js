'use strict';

angular.module('loanApp.version', [
  'loanApp.version.interpolate-filter',
  'loanApp.version.version-directive'
])

.value('version', '0.1');
