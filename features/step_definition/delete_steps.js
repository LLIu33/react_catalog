(function () {
  "use strict";

  function delete_steps () {

    this.When(/^I attempt to delete thie related data in the product catalogue$/, function (callback) {
      const allCodeNodes = this.browser.queryAll('tbody tr td:nth-child(2)');
      let targetRow;
      for (let i = 0; i < allCodeNodes.length; i++) {
        if (this.browser.text(allCodeNodes[i]) === "Blue") {
          targetRow = allCodeNodes[i].parentNode;
        }
      }
      let deleteBtn = this.browser.query('.btn-danger', targetRow);
      this.browser.pressButton(deleteBtn, callback);
    });

    this.Then(/^the data has been deleted in the database$/, function (callback) {
      const allCodes = this.browser.text('tbody tr td:nth-child(2)');
      const count = allCodes.split("Blue").length - 1;
      if (count === 0) {
        callback();
      } else {
        callback(new Error("Product not deleted"));
      }
    });

  };
  module.exports = delete_steps;
})();