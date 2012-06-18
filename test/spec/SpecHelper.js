beforeEach(function() {
  this.addMatchers({
    toExist: function() {
      var obj = this.actual;
      return typeof obj !== "undefined" && obj !== null;
    }
  });
});
