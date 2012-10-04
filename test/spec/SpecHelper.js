beforeEach(function() {
  this.addMatchers({
    toExist: function() {
      var obj = this.actual;
      return typeof obj !== "undefined" && obj !== null;
    },
    toBeEmpty: function() {
      var arr = this.actual;
      return arr.length === 0;
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
    toContainAllOf: function(arr) {
      var actArr = this.actual;
      var contains = true;
      for (var i=0, ii=arr.length; i<ii; i++) {
        if (!~actArr.indexOf(arr[i]))
          contains = false;
      }
      return contains;
    },
    toHaveCharacteristic: function(trait, characteristic) {
      var org;
      if (this.actual.length) {
        var sex = this.actual[0],
            alleles = this.actual[1],
            species = this.actual[2] || BioLogica.Species.Drake;

        org = new BioLogica.Organism(species, alleles, sex);
      } else {
        org = this.actual;
      }
      this.message = function() {
        return "Expected trait " + trait + " to be " + characteristic + " but got " + org.getCharacteristic(trait) + " from org " + org.toString();
      };
      return org.getCharacteristic(trait) == characteristic;
    }
  });
});
