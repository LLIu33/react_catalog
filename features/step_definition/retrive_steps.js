(function () {
  "use strict";

  function retrive_steps () {

    this.Given(/^that I am passing valid "([^"]*)"$/, function (product_code, callback) {
      this.browser.assert.text('tbody tr:first-child td:nth-child(2)', product_code);
      callback();
    });

    this.When(/^I attempt to bring back all related data$/, function (callback) {
       this.browser.assert.element('tbody tr:first-child td:nth-child(3)')
       this.browser.assert.element('tbody tr:first-child td:nth-child(4)');
       callback();
     });

    this.Then(/^I receive a success message$/, function (callback) {
      this.browser.assert.text('tbody tr:first-child td:nth-child(1)', '1');
      callback();
    });

    this.Then(/^the data returned is "([^"]*)" and "([^"]*)"$/, function (name, price, callback) {
      this.browser.assert.text('tbody tr:first-child td:nth-child(3)', name);
      this.browser.assert.text('tbody tr:first-child td:nth-child(4)', price);
      callback();
    });

  };
  module.exports = retrive_steps;
})();