(function () {
  "use strict";

  function update_steps () {
    const product = {
      code: 'Yellow',
      name: 'Jane',
      price: 12
    }
    this.Given(/^that I am passing valid <"Product Code"> , <"Product Name"> and <"Price">$/, function (callback) {
      this.browser.pressButton('tbody tr:first-child .btn-primary');
      this.browser
        .fill('code', product.code)
        .fill('name', product.name)
        .fill('price', product.price);
      this.browser.assert.attribute('tbody tr:first-child .btn-success', 'disabled', null);
      callback();
    });


    this.When(/^I attempt to update this existing data in the product catalogue with a new <"Price">$/, function (callback) {
      this.browser.assert.element('tbody tr:first-child .btn-success');
      this.browser.pressButton('tbody tr:first-child .btn-success', callback);
    });


    this.Then(/^the data has been updated in the database$/, function (callback) {
      this.browser.assert.text('tbody tr:first-child td:nth-child(4)', product.price);
      callback();
    });


    this.Then(/^a duplicate row of data has not been created\.$/, function (callback) {
      const allCodes = this.browser.text('tbody tr td:nth-child(2)');
      const count = allCodes.split(product.code).length - 1;
      if (count === 1) {
        callback();
      } else {
        callback(new Error("Duplicate was created"));
      }
    });

  };
  module.exports = update_steps;
})();
