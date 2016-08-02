(function () {
  "use strict";

  function creaete_steps () {
    let product;
    this.Given(/^that I am passing valid "([^"]*)" , "([^"]*)" and "([^"]*)"$/, function (product_code, product_name, product_price, callback) {
      const browser = this.browser;
      product = {
        code: product_code,
        name: product_name,
        price: product_price
      };
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
      let saveBtn = this.browser.query('tbody tr .btn-success');
      this.browser.assert.element(saveBtn);
      if (saveBtn.disabled) {
        callback();
      } else {
        this.browser.pressButton(saveBtn, callback);
      }
    });

    this.Then(/^the data has been entered into the database\.$/, function (callback) {
      const allCodes = this.browser.text('tbody tr td:nth-child(2)');
      const count = allCodes.split(product.code).length - 1;
      if (count === 1) {
        callback();
      } else {
        callback(new Error("Product not created"));
      }
    });

    this.Given(/^that I am passing valid "([^"]*)" and "([^"]*)" but invalid "([^"]*)"$/, function (product_code, product_name, product_price, callback) {
      const browser = this.browser;
      browser.pressButton('.btn-info', function() {
        browser
          .fill('code', product_code)
          .fill('name', product_name)
          .fill('price', product_price);
        callback();
      });
    });

    this.Then(/^I receive an appropriate error response$/, function (callback) {
      this.browser.assert.attribute('tbody tr .btn-success', 'disabled', '');
      callback();
    });

    this.Then(/^the data has NOT been entered into the database\.$/, function(callback) {
      const allCodes = this.browser.text('tbody tr td:nth-child(2)');
      const count = allCodes.split("Orange").length - 1;
      if (count === 0) {
        callback();
      } else {
        callback(new Error("Wrong Product was created"));
      }
    });

  };
  module.exports = creaete_steps;
})();