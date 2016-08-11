'use strict';

describe('Producers E2E Tests:', function () {
  describe('Test Producers page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/producers');
      expect(element.all(by.repeater('producer in producers')).count()).toEqual(0);
    });
  });
});
