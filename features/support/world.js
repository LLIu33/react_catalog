const Zombie = require('zombie');

// browser, visit will be available in the step definition
function World() {
  this.browser = new Zombie({debug: true});

  this.visit = function (url, callback) {
    this.browser.visit(url, callback);
  };
}

module.exports = function () {
  this.World = World;
};
