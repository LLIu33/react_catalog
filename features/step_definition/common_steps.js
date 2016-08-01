(function () {
  "use strict";

  function common_steps () {

    this.Given(/^that I am passing valid "([^"]*)"$/, function (product_code, callback) {
      const allCodes = this.browser.text('tbody tr td:nth-child(2)');
      const count = allCodes.split(product_code).length - 1;
      if (count === 1) {
        callback();
      } else {
        callback(new Error("Not found code"));
      }
    });

  };
  module.exports = common_steps;
})();