'use strict';

describe('loanApp.version module', function() {
  beforeEach(module('loanApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
