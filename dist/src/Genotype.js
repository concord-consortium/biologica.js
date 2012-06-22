// Generated by CoffeeScript 1.3.3

/*
  The constructor should be passed a genotypeHash, of the form below, and this
  will be copied to the @chromosomes property.

  genotypeHash =
    {
      1: {
            a: ["Tk", "M", "w"]
            b: ["t", "m", "W"]
         }
      2: { ... }
      XY: { ... }
    }
*/


(function() {
  var __hasProp = {}.hasOwnProperty;

  BioLogica.Genotype = (function() {

    function Genotype(sex, genotypeHash) {
      var alleles, chromosome, side, sides, _ref;
      if (sex === BioLogica.MALE) {
        if ((_ref = genotypeHash.XY) != null) {
          _ref.b = [];
        }
      }
      this.chromosomes = {};
      this.allAlleles = [];
      for (chromosome in genotypeHash) {
        if (!__hasProp.call(genotypeHash, chromosome)) continue;
        sides = genotypeHash[chromosome];
        this.chromosomes[chromosome] = {};
        for (side in sides) {
          if (!__hasProp.call(sides, side)) continue;
          alleles = sides[side];
          this.chromosomes[chromosome][side] = alleles.slice(0);
          this.allAlleles = this.allAlleles.concat(alleles.slice(0));
        }
      }
    }

    Genotype.prototype.containsAlleles = function(alleles) {
      var allAllelesCopy, allele, _i, _len;
      allAllelesCopy = this.allAlleles.slice(0);
      for (_i = 0, _len = alleles.length; _i < _len; _i++) {
        allele = alleles[_i];
        if (!allAllelesCopy.removeObj(allele)) {
          return false;
        }
      }
      return true;
    };

    return Genotype;

  })();

}).call(this);
