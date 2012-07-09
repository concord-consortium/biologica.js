// Generated by CoffeeScript 1.3.3
(function() {

  BioLogica.Chromosome = (function() {

    function Chromosome(name, alleles) {
      this.name = name;
      this.alleles = alleles;
    }

    Chromosome.prototype.clone = function(newName) {
      return new BioLogica.Chromosome(newName || this.name, this.alleles.slice(0));
    };

    return Chromosome;

  })();

}).call(this);