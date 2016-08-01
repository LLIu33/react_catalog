var hooks = function () {
  this.Before(function (scenario, callback) {
    var that = this;
    this.visit('http://localhost:3000/api/product/reset', function() {
      that.visit('http://localhost:3000', callback);
    });
  });
};

module.exports = hooks;