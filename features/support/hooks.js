var hooks = function () {
  this.Before(function (scenario, callback) {
    this.visit('http://localhost:3000', callback);
  });
};

module.exports = hooks;