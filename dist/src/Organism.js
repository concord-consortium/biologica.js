(function() {
  BioLogica.Organism = (function() {
    function Organism(species, sex, alleles) {
      this.species = species;
      this.sex = sex;
      this.alleles = alleles;
      this.genetics = new BioLogica.Genetics(this.species, this.alleles);
      ({
        /*
              For a given trait (a species-level property), returns this organism's
              characteristic. E.g. getCharacteristic("color") may return "green",
              getCharacteristic("horns") may return "no horns".
            */
        getCharacteristic: function(trait) {},
        performMeiosis: function(crossover) {}
      });
    }
    return Organism;
  })();
}).call(this);
