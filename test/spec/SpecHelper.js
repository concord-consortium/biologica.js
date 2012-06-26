beforeEach(function() {
  this.addMatchers({
    toExist: function() {
      var obj = this.actual;
      return typeof obj !== "undefined" && obj !== null;
    },
    toBeBetween: function(min, max) {
      var num = this.actual;
      return num >= min && num <= max;
    },
    toBeAnyOneOf: function(arr) {
      var act = this.actual;
      return ~arr.indexOf(act);
    },
    toContainAnyOneOf: function(arr) {
      var actArr = this.actual;
      var contains = false;
      for (var i=0, ii=actArr.length; i<ii; i++) {
        if (~arr.indexOf(actArr[i]))
          contains = true;
      }
      return contains;
    },
    toHaveCharacteristic: function(trait, characteristic) {
      if (this.actual.length) {
        var sex = this.actual[0],
            alleles = this.actual[1],
            org = new BioLogica.Organism(BioLogica.Species.Drake, alleles, sex);
      } else {
        org = this.actual;
      }
      return org.getCharacteristic(trait) == characteristic;
    }
  });
});
