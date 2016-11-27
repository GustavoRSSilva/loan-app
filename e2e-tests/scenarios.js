'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

  describe('app', function() {

    beforeEach(function() {
      browser.get('app/');
    });

    it('should render admin when user navigates to /admin', function() {
      expect(element.tilte()).
        toMatch(/Backoffice/);
    });

  });
});
