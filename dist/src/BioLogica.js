// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty;

  window.BioLogica = {};

  BioLogica.breed = function(mother, father) {
    var chromatidA, chromatidB, chromoName, chromosome, gamete1, gamete2, genotypeHash, i;
    gamete1 = mother.genetics.createGametes(1);
    gamete2 = father.genetics.createGametes(1);
    for (i in gamete2) {
      chromosome = gamete2[i];
      if (chromosome.name === "a") {
        chromosome.name = "b";
      }
    }
    if (gamete2["XY"].name === "x") {
      gamete1["XY"].name = "x1";
      gamete2["XY"].name = "x2";
    }
    genotypeHash = {};
    for (chromoName in gamete1) {
      if (!__hasProp.call(gamete1, chromoName)) continue;
      chromatidA = gamete1[chromoName];
      chromatidB = gamete2[chromoName];
      genotypeHash[chromoName] = {};
      genotypeHash[chromoName][chromatidA.name] = chromatidA.alleles;
      genotypeHash[chromoName][chromatidB.name] = chromatidB.alleles;
    }
    return new BioLogica.Organism(mother.species, genotypeHash);
  };

}).call(this);
