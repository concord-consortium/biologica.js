(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  BioLogica.Genetics = (function() {
    var convertAlleleStringToChromosomes;
    function Genetics(species, alleles) {
      this.species = species;
      this.alleles = alleles;
    }
    convertAlleleStringToChromosomes = function(alleleString) {
      var allele, alleleSpec, chromoName, side, split, _i, _j, _len, _len2, _ref, _ref2, _results;
      this.chromosomes = {};
      _ref = this.species.chromosomes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chromoName = _ref[_i];
        this.chromosomes[chromoName] = {};
      }
      _ref2 = alleleString.split(",");
      _results = [];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        alleleSpec = _ref2[_j];
        split = alleleSpec.split(":");
        side = split[0];
        _results.push(allele = split[1]);
      }
      return _results;
    };
    /*
        Returns true if the allele passed is a member of the gene, where the
        gene is indeicated by an example allele.
        isAlleleOfGene("dl", "D") => true
        isAlleleOfGene("rh", "D") => false
      */
    Genetics.prototype.isAlleleOfGene = function(allele, exampleOfGene) {
      var allelesOfGene, gene, _ref;
      _ref = this.species.geneList;
      for (gene in _ref) {
        if (!__hasProp.call(_ref, gene)) continue;
        allelesOfGene = this.species.geneList[gene];
        if (__indexOf.call(allelesOfGene, allele) >= 0 && __indexOf.call(allelesOfGene, exampleOfGene) >= 0) {
          return true;
        }
      }
      return false;
    };
    Genetics.prototype.findChromosome = function(allele) {
      var alleles, chromosome, _ref;
      _ref = this.species.chromosomeAllelesMap;
      for (chromosome in _ref) {
        alleles = _ref[chromosome];
        if (__indexOf.call(alleles, allele) >= 0) {
          return chromosome;
        }
      }
    };
    /*
        Given an array of alleles and an array of genes, filter the alleles to return only
        those alleles that are included in the array of genes.
        filter(["Tk", "m", "W", "dl"], ["T", "D"]) => ["Tk", "dl"]
      */
    Genetics.prototype.filter = function(alleles, filter) {
      return alleles.filter(__bind(function(allele) {
        var gene, _i, _len;
        for (_i = 0, _len = filter.length; _i < _len; _i++) {
          gene = filter[_i];
          if (this.isAlleleOfGene(allele, gene)) {
            return true;
          }
        }
        return false;
      }, this));
    };
    return Genetics;
  })();
  /* Class methods (non-instance) */
  /*
    Parses the original Java BioLogica allele format and returns an object with a and
    b representing the alleles on each side.
    parseAlleleString("a:h,b:H,a:t,b:t,a:Dl,b:D") =>
      { a: ["h", "t", "Dl"], b: ["H", "t", "D"] }
  */
  BioLogica.Genetics.parseAlleleString = function(alleleString) {
    return {
      a: alleleString.match(/a:([^,])*/g).map(function(short) {
        return short.match(/[^:]+$/)[0];
      }),
      b: alleleString.match(/b:([^,])*/g).map(function(short) {
        return short.match(/[^:]+$/)[0];
      })
    };
  };
}).call(this);
