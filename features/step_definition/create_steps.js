(function () {
  "use strict";

  function creaete_steps () {

    this.Given(/^that I am passing valid "([^"]*)", "([^"]*)" and "([^"]*)"$/, function (product_code, product_name, product_price, callback) {
      const browser = this.browser;
      browser.pressButton('.btn-info', function() {
        browser
          .fill('code', product_code)
          .fill('name', product_name)
          .fill('price', product_price);
        browser.assert.attribute('tbody tr .btn-success', 'disabled', null);
        callback();
      });
    });


    this.When(/^I attempt to add this data to the product catalogue$/, function (callback) {
      this.browser.assert.element('tbody tr .btn-success');
      this.browser.pressButton('tbody tr .btn-success', callback);
    });

    this.Then(/^the data has been entered into the database\.$/, function (callback) {
      const allCodes = this.browser.text('tbody tr td:nth-child(2)');
      const count = allCodes.split("Purple").length - 1;
      if (count === 1) {
        callback();
      } else {
        callback(new Error("Product not created"));
      }
    });

  };
  module.exports = creaete_steps;
})();