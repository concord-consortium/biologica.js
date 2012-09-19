// Generated by CoffeeScript 1.3.3

/* jslint debug: true
*/


(function() {
  var __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Array.prototype.remove = function(from, to) {
    var rest;
    rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  Array.prototype.removeObj = function(obj) {
    var i;
    i = this.indexOf(obj);
    if (~i) {
      this.remove(i);
      return true;
    } else {
      return false;
    }
  };

  Array.prototype.replaceFirst = function(obj, replacement) {
    return this[this.indexOf(obj)] = replacement;
  };

  Array.prototype.shuffle = function() {
    var current, tmp, top;
    top = this.length;
    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = this[current];
        this[current] = this[top];
        this[top] = tmp;
      }
    }
    return this;
  };

  window.ExtMath = {};

  ExtMath.randomInt = function(max) {
    return Math.floor(Math.random() * max);
  };

  ExtMath.flip = function() {
    return ExtMath.randomInt(2);
  };

  window.BioLogica = {};

  BioLogica.FEMALE = 1;

  BioLogica.MALE = 0;

  BioLogica.Chromosome = (function() {

    function Chromosome(species, chromosome, side, alleles) {
      var _this = this;
      this.species = species;
      this.chromosome = chromosome;
      this.side = side;
      this.alleles = alleles.sort(function(a, b) {
        if (_this.getAllelesPosition(a) > _this.getAllelesPosition(b)) {
          return 1;
        } else {
          return -1;
        }
      });
    }

    Chromosome.prototype.clone = function(newSide) {
      return new BioLogica.Chromosome(this.species, this.chromosome, newSide || this.side, this.alleles.slice(0));
    };

    Chromosome.prototype.lengthInCentimorgans = 100;

    Chromosome.prototype.getlengthInBasePairs = function() {
      return this.species.chromosomesLength[this.chromosome];
    };

    Chromosome.prototype.getGeneOfAllele = function(allele) {
      var gene, geneName, _ref;
      _ref = this.species.geneList;
      for (geneName in _ref) {
        if (!__hasProp.call(_ref, geneName)) continue;
        gene = _ref[geneName];
        if (~gene.alleles.indexOf(allele)) {
          return geneName;
        }
      }
    };

    Chromosome.prototype.getAllelesPosition = function(allele) {
      var geneName, _ref;
      geneName = this.getGeneOfAllele(allele);
      return ((_ref = this.species.geneList[geneName]) != null ? _ref.start : void 0) || -1;
    };

    return Chromosome;

  })();

  BioLogica.Chromosome.createChromosome = function(chr1, chr2, crossPoint) {
    var allele, i, newAlleles, _i, _len, _ref;
    newAlleles = [];
    _ref = chr1.alleles;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      allele = _ref[i];
      if (chr1.getAllelesPosition(allele) < crossPoint) {
        newAlleles.push(allele);
      } else {
        newAlleles.push(chr2.alleles[i]);
      }
    }
    return new BioLogica.Chromosome(chr1.species, chr1.chromosome, chr1.side, newAlleles);
  };

  /*
    The constructor should be passed a genotypeHash, of the form below, and this
    will be copied to the @chromosomes property.
  
    genotypeHash =
      {
        1: {
              a: ["Tk", "M", "w"]
              b: ["t", "m", "W"]
           }
        2: { a:..., b:... }
        XY: { x1:..., x2:... }
      }
  */


  BioLogica.Genotype = (function() {

    function Genotype(species, genotypeHash, sex) {
      var alleles, chromosome, side, sides, _ref, _ref1;
      this.sex = sex;
      this.chromosomes = {};
      this.allAlleles = [];
      for (chromosome in genotypeHash) {
        if (!__hasProp.call(genotypeHash, chromosome)) continue;
        sides = genotypeHash[chromosome];
        this.chromosomes[chromosome] = {};
        for (side in sides) {
          if (!__hasProp.call(sides, side)) continue;
          alleles = sides[side];
          if (side === "y") {
            alleles = [];
          }
          this.chromosomes[chromosome][side] = new BioLogica.Chromosome(species, chromosome, side, alleles.slice(0));
          this.allAlleles = this.allAlleles.concat(alleles.slice(0));
        }
      }
      if ((_ref = this.sex) == null) {
        this.sex = ((_ref1 = this.chromosomes.XY) != null ? _ref1.y : void 0) != null ? BioLogica.MALE : BioLogica.FEMALE;
      }
    }

    Genotype.prototype.containsAlleles = function(alleles) {
      var allAllelesCopy, allele, _i, _len;
      allAllelesCopy = this.allAlleles.slice(0);
      if (this.sex === BioLogica.MALE) {
        allAllelesCopy.push("Y");
      }
      for (_i = 0, _len = alleles.length; _i < _len; _i++) {
        allele = alleles[_i];
        if (!allAllelesCopy.removeObj(allele)) {
          return false;
        }
      }
      return true;
    };

    Genotype.prototype.replaceAllele = function(chromosome, allele, newAllele) {
      chromosome.alleles.replaceFirst(allele, newAllele);
      return this.allAlleles.replaceFirst(allele, newAllele);
    };

    Genotype.prototype.getAlleleString = function() {
      var allele, alleleString, alleles, c, chromosome, chromosomes, i, otherSide, side, _i, _len, _ref, _ref1;
      alleleString = "";
      _ref = this.chromosomes;
      for (c in _ref) {
        if (!__hasProp.call(_ref, c)) continue;
        chromosomes = _ref[c];
        for (side in chromosomes) {
          if (!__hasProp.call(chromosomes, side)) continue;
          chromosome = chromosomes[side];
          alleles = chromosome.alleles;
          otherSide = side === "x" ? "y" : side === "x1" ? "x2" : "b";
          if (side === "x" || side === "x1") {
            side = "a";
          }
          if (side !== "a") {
            continue;
          }
          for (i = _i = 0, _len = alleles.length; _i < _len; i = ++_i) {
            allele = alleles[i];
            alleleString += "" + side + ":" + allele + ",";
            if (chromosomes[otherSide]) {
              alleleString += "b:" + ((_ref1 = chromosomes[otherSide]) != null ? _ref1.alleles[i] : void 0) + ",";
            }
          }
        }
      }
      return alleleString.substring(0, alleleString.length - 1);
    };

    return Genotype;

  })();

  BioLogica.Genetics = (function() {

    function Genetics(species, alleles, sex) {
      var genotypeHash;
      this.species = species;
      this.alleles = alleles;
      genotypeHash = typeof this.alleles === "string" ? this.convertAlleleStringToGenotypeHash(this.alleles, sex) : this.alleles;
      this.topUpChromosomes(genotypeHash);
      this.genotype = new BioLogica.Genotype(this.species, genotypeHash, sex);
    }

    /*
        Converts an alleleString to a genotype hash
        e.g. convertAlleleStringToChromosomes("a:t,b:t,a:h,b:H,a:Dl", female) =>
          {"1": {a: ["t"], b: ["t"]}, "2": {a: ["h"], b: ["H"]}, "XY": {x1: ["Dl"]}}
    */


    Genetics.prototype.convertAlleleStringToGenotypeHash = function(alleleString, sex) {
      var allele, alleles, chromoName, genotypeHash, side, sides, split, _i, _j, _len, _len1, _ref;
      split = BioLogica.Genetics.parseAlleleString(alleleString);
      genotypeHash = {};
      _ref = this.species.chromosomeNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        chromoName = _ref[_i];
        genotypeHash[chromoName] = {};
        sides = this.getSides(chromoName, sex);
        genotypeHash[chromoName][sides[0]] = [];
        genotypeHash[chromoName][sides[1]] = [];
      }
      for (side in split) {
        if (!__hasProp.call(split, side)) continue;
        alleles = split[side];
        if (!alleles) {
          continue;
        }
        for (_j = 0, _len1 = alleles.length; _j < _len1; _j++) {
          allele = alleles[_j];
          chromoName = this.findChromosome(allele);
          if (!chromoName) {
            continue;
          }
          sides = this.getSides(chromoName, sex);
          genotypeHash[chromoName][side === "a" ? sides[0] : sides[1]].push(allele);
        }
      }
      return genotypeHash;
    };

    /*
        "tops-up" the chromosomes: fills in any missing genes with random alleles.
        At the moment this assumes that all chromosomes have been specified, even if they
        don't all have all the possible genes
    */


    Genetics.prototype.topUpChromosomes = function(genotypeHash) {
      var chromoName, chromosome, gene, genes, side, _results;
      _results = [];
      for (chromoName in genotypeHash) {
        if (!__hasProp.call(genotypeHash, chromoName)) continue;
        chromosome = genotypeHash[chromoName];
        genes = this.species.chromosomeGeneMap[chromoName];
        _results.push((function() {
          var _i, _len, _results1;
          _results1 = [];
          for (_i = 0, _len = genes.length; _i < _len; _i++) {
            gene = genes[_i];
            _results1.push((function() {
              var _results2;
              _results2 = [];
              for (side in chromosome) {
                if (!__hasProp.call(chromosome, side)) continue;
                if (!(this.chromosomeContainsGene(genotypeHash[chromoName][side], gene) || side === "y")) {
                  _results2.push(genotypeHash[chromoName][side].push(this.getRandomAllele(gene)));
                } else {
                  _results2.push(void 0);
                }
              }
              return _results2;
            }).call(this));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    Genetics.prototype.getSides = function(chromoName, sex) {
      if (chromoName !== "XY") {
        return ["a", "b"];
      } else {
        if (sex === BioLogica.FEMALE) {
          return ["x1", "x2"];
        } else {
          return ["x", "y"];
        }
      }
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
        allelesOfGene = this.species.geneList[gene].alleles;
        if (__indexOf.call(allelesOfGene, allele) >= 0 && __indexOf.call(allelesOfGene, exampleOfGene) >= 0) {
          return true;
        }
      }
      return false;
    };

    /*
        Finds the chromosome that a given allele is part of
    */


    Genetics.prototype.findChromosome = function(allele) {
      var chromosome, gene, genes, _i, _len, _ref;
      _ref = this.species.chromosomeGeneMap;
      for (chromosome in _ref) {
        genes = _ref[chromosome];
        for (_i = 0, _len = genes.length; _i < _len; _i++) {
          gene = genes[_i];
          if (this.isAlleleOfGene(allele, gene)) {
            return chromosome;
          }
        }
      }
      return false;
    };

    /*
        Returns true if chromosome array contains any allele of the gene
    */


    Genetics.prototype.chromosomeContainsGene = function(chromosome, exampleOfGene) {
      var allele, _i, _len;
      for (_i = 0, _len = chromosome.length; _i < _len; _i++) {
        allele = chromosome[_i];
        if (this.isAlleleOfGene(allele, exampleOfGene)) {
          return true;
        }
      }
      return false;
    };

    /*
        Returns random allele of the gene
    */


    Genetics.prototype.getRandomAllele = function(exampleOfGene) {
      var allelesOfGene, gene, rand, _allelesOfGene, _ref;
      _ref = this.species.geneList;
      for (gene in _ref) {
        if (!__hasProp.call(_ref, gene)) continue;
        _allelesOfGene = this.species.geneList[gene].alleles;
        if (__indexOf.call(_allelesOfGene, exampleOfGene) >= 0) {
          allelesOfGene = _allelesOfGene;
          break;
        }
      }
      rand = Math.floor(Math.random() * allelesOfGene.length);
      return allelesOfGene[rand];
    };

    /*
        Given an array of alleles and an array of genes, filter the alleles to return only
        those alleles that are included in the array of genes.
        filter(["Tk", "m", "W", "dl"], ["T", "D"]) => ["Tk", "dl"]
    */


    Genetics.prototype.filter = function(alleles, filter) {
      var _this = this;
      return alleles.filter(function(allele) {
        var gene, _i, _len;
        for (_i = 0, _len = filter.length; _i < _len; _i++) {
          gene = filter[_i];
          if (_this.isAlleleOfGene(allele, gene)) {
            return true;
          }
        }
        return false;
      });
    };

    /*
        Returns four haploid cells, without crossover for now
    */


    Genetics.prototype.performMeiosis = function(performCrossover) {
      var cell, cells, chromoName, chromosome, chromosomes, containsYchromosome, i, newSide, side, sisterChromatidIds, sisterChromatids, _i, _len, _ref;
      cells = [{}, {}, {}, {}];
      _ref = this.genotype.chromosomes;
      for (chromoName in _ref) {
        if (!__hasProp.call(_ref, chromoName)) continue;
        chromosomes = _ref[chromoName];
        sisterChromatids = {};
        sisterChromatidIds = ["b2", "b1", "a2", "a1"];
        containsYchromosome = false;
        for (side in chromosomes) {
          if (!__hasProp.call(chromosomes, side)) continue;
          chromosome = chromosomes[side];
          newSide = this.getHaploidChromatidSide(chromosome);
          sisterChromatids[sisterChromatidIds.pop()] = chromosome.clone(newSide);
          sisterChromatids[sisterChromatidIds.pop()] = chromosome.clone(newSide);
          if (side === "y") {
            containsYchromosome = true;
          }
        }
        if (performCrossover && !containsYchromosome) {
          this.crossover(sisterChromatids);
        }
        sisterChromatidIds = ["b2", "b1", "a2", "a1"].shuffle();
        for (i = _i = 0, _len = cells.length; _i < _len; i = ++_i) {
          cell = cells[i];
          cell[chromoName] = sisterChromatids[sisterChromatidIds[i]];
        }
      }
      return cells;
    };

    Genetics.prototype.getHaploidChromatidSide = function(chromatid) {
      if (chromatid.side === "b") {
        return "a";
      } else if (chromatid.side === "x1" || chromatid.side === "x2") {
        return "x";
      } else {
        return chromatid.side;
      }
    };

    Genetics.prototype.crossover = function(sisterChromatids) {
      var crossoverPoints, endSide, newChromatids, point, startSide, _i, _len, _results;
      crossoverPoints = this.createCrossoverPoints(sisterChromatids.a1);
      _results = [];
      for (_i = 0, _len = crossoverPoints.length; _i < _len; _i++) {
        point = crossoverPoints[_i];
        startSide = ["a1", "a2"][ExtMath.flip()];
        endSide = ["b1", "b2"][ExtMath.flip()];
        newChromatids = this.crossChromatids(sisterChromatids[startSide], sisterChromatids[endSide], point);
        sisterChromatids[startSide] = newChromatids[0];
        _results.push(sisterChromatids[endSide] = newChromatids[1]);
      }
      return _results;
    };

    Genetics.prototype.crossChromatids = function(chr1, chr2, point) {
      return [BioLogica.Chromosome.createChromosome(chr2, chr1, point), BioLogica.Chromosome.createChromosome(chr1, chr2, point)];
    };

    /*
        Create an array of locations (in base pairs) where the parent pair of chromosomes will cross
    
        First, randomly select the 10 cM segments that will experience crossover events. Give every 10 cM
        segment of the chromosome an independent probability of 0.2 of experiencing a crossover. This will
        result in having between 0 and num_10cM_segments crossover events. If the number of crossover events
        is greater than three then randomly drop all but three of the crossover events.
    
        For each remaining event, determine the exact location of the crossover using a uniform random
        distribution from the start to the end of the 10 cM segment.
    */


    Genetics.prototype.createCrossoverPoints = function(chromatid) {
      var crossoverPoint, crossoverPoints, i, lengthOfDM, positionOnDM, totalDeciMorgans, _i, _len;
      totalDeciMorgans = Math.floor(chromatid.lengthInCentimorgans / 10);
      crossoverPoints = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= totalDeciMorgans ? _i < totalDeciMorgans : _i > totalDeciMorgans; i = 0 <= totalDeciMorgans ? ++_i : --_i) {
          if (Math.random() < 0.2) {
            _results.push(i);
          }
        }
        return _results;
      })();
      while (crossoverPoints.length > 3) {
        crossoverPoints.remove(ExtMath.randomInt(crossoverPoints.length));
      }
      lengthOfDM = chromatid.getlengthInBasePairs() / totalDeciMorgans;
      for (i = _i = 0, _len = crossoverPoints.length; _i < _len; i = ++_i) {
        crossoverPoint = crossoverPoints[i];
        positionOnDM = ExtMath.randomInt(lengthOfDM);
        crossoverPoints[i] = (crossoverPoint * lengthOfDM) + positionOnDM;
      }
      return crossoverPoints;
    };

    return Genetics;

  })();

  /* Class methods (non-instance)
  */


  /*
    Parses the original Java BioLogica allele format and returns an object with a and
    b representing the alleles on each side.
    parseAlleleString("a:h,b:H,a:t,b:t,a:Dl,b:D") =>
      { a: ["h", "t", "Dl"], b: ["H", "t", "D"] }
  */


  BioLogica.Genetics.parseAlleleString = function(alleleString) {
    var _ref, _ref1;
    return {
      a: (_ref = alleleString.match(/a:([^,])*/g)) != null ? _ref.map(function(str) {
        var _ref1;
        return (_ref1 = str.match(/[^:]+$/)) != null ? _ref1[0] : void 0;
      }) : void 0,
      b: (_ref1 = alleleString.match(/b:([^,])*/g)) != null ? _ref1.map(function(str) {
        var _ref2;
        return (_ref2 = str.match(/[^:]+$/)) != null ? _ref2[0] : void 0;
      }) : void 0
    };
  };

  BioLogica.Phenotype = (function() {

    function Phenotype(genetics) {
      var alleles, possibleAlleles, possibleCharacteristic, possibleCharacteristics, trait, _i, _len, _ref;
      this.characteristics = {};
      _ref = genetics.species.traitRules;
      for (trait in _ref) {
        if (!__hasProp.call(_ref, trait)) continue;
        possibleCharacteristics = _ref[trait];
        for (possibleCharacteristic in possibleCharacteristics) {
          if (!__hasProp.call(possibleCharacteristics, possibleCharacteristic)) continue;
          possibleAlleles = possibleCharacteristics[possibleCharacteristic];
          for (_i = 0, _len = possibleAlleles.length; _i < _len; _i++) {
            alleles = possibleAlleles[_i];
            if (genetics.genotype.containsAlleles(alleles)) {
              this.characteristics[trait] = possibleCharacteristic;
              break;
            }
          }
          if (this.characteristics[trait]) {
            break;
          }
        }
      }
    }

    return Phenotype;

  })();

  BioLogica.Organism = (function() {

    function Organism(species, alleles, sex) {
      var _ref;
      this.species = species;
      this.sex = sex;
      this.alleles = typeof alleles === "string" ? this.preProcessAlleleString(alleles) : alleles;
      this.genetics = new BioLogica.Genetics(this.species, this.alleles, this.sex);
      if ((_ref = this.sex) == null) {
        this.sex = this.genetics.genotype.sex;
      }
      this.resetPhenotype();
    }

    Organism.prototype.getGenotype = function() {
      return this.genetics.genotype;
    };

    Organism.prototype.resetPhenotype = function() {
      return this.phenotype = new BioLogica.Phenotype(this.genetics);
    };

    /*
        For a given trait (a species-level property), returns this organism's
        characteristic. E.g. getCharacteristic("color") may return "green",
        getCharacteristic("horns") may return "no horns".
    */


    Organism.prototype.getCharacteristic = function(trait) {
      return this.phenotype.characteristics[trait];
    };

    Organism.prototype.getImageName = function() {
      return this.species.getImageName(this);
    };

    /*
        Creates n gametes, using crossover during meiosis by default .
        If only one gamete is requested, that gamete will be returned. Otherwise an
        array of gametes will be returned
    */


    Organism.prototype.createGametes = function(n, performCrossover) {
      var gametes, i, _i, _ref;
      if (performCrossover == null) {
        performCrossover = true;
      }
      gametes = [];
      for (i = _i = 0, _ref = Math.floor(n / 4); 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        gametes = gametes.concat(this.genetics.performMeiosis(performCrossover));
      }
      gametes = gametes.concat(this.genetics.performMeiosis(performCrossover).slice(0, n % 4));
      if (gametes.length === 1) {
        return gametes[0];
      } else {
        return gametes;
      }
    };

    Organism.prototype.preProcessAlleleString = function(str) {
      return str.replace(/,+$/, "");
    };

    Organism.prototype.toString = function() {
      var alleles, sex;
      sex = this.sex === BioLogica.FEMALE ? "female" : "male";
      alleles = this.genetics.genotype.allAlleles;
      return "Organism: {sex: " + sex + ", authored alleles: " + this.alleles + ", alleles: " + alleles;
    };

    return Organism;

  })();

  BioLogica.Organism.createOrganism = function(species, alleles, sex) {
    if (alleles == null) {
      alleles = "";
    }
    if (sex == null) {
      sex = ExtMath.flip() ? BioLogica.FEMALE : BioLogica.MALE;
    }
    return new BioLogica.Organism(species, alleles, sex);
  };

  BioLogica.Organism.createLiveOrganism = function(species, alleles, sex) {
    var org;
    if (alleles == null) {
      alleles = "";
    }
    if (sex == null) {
      sex = ExtMath.flip() ? BioLogica.FEMALE : BioLogica.MALE;
    }
    org = new BioLogica.Organism(species, alleles, sex);
    org.species.makeAlive(org);
    return org;
  };

  BioLogica.Organism.createFromGametes = function(species, motherGamete, fatherGamete) {
    var chromatidA, chromatidB, chromoName, chromosome, genotypeHash, i;
    for (i in fatherGamete) {
      chromosome = fatherGamete[i];
      if (chromosome.side === "a") {
        chromosome.side = "b";
      }
    }
    if (fatherGamete["XY"].side === "x") {
      motherGamete["XY"].side = "x1";
      fatherGamete["XY"].side = "x2";
    }
    genotypeHash = {};
    for (chromoName in motherGamete) {
      if (!__hasProp.call(motherGamete, chromoName)) continue;
      chromatidA = motherGamete[chromoName];
      chromatidB = fatherGamete[chromoName];
      genotypeHash[chromoName] = {};
      genotypeHash[chromoName][chromatidA.side] = chromatidA.alleles;
      genotypeHash[chromoName][chromatidB.side] = chromatidB.alleles;
    }
    return new BioLogica.Organism(species, genotypeHash);
  };

  /*
    Breed two parents together. By default crossover will be used during meiosis
  */


  BioLogica.breed = function(mother, father, crossover) {
    var gamete1, gamete2;
    gamete1 = mother.createGametes(1, crossover);
    gamete2 = father.createGametes(1, crossover);
    return BioLogica.Organism.createFromGametes(mother.species, gamete1, gamete2);
  };

  BioLogica.Species = {};

  BioLogica.Species.Drake = {
    name: "Drake",
    chromosomeNames: ['1', '2', 'XY'],
    chromosomeGeneMap: {
      '1': ['t', 'm', 'w', 'h'],
      '2': ['c', 'b', 'fl', 'hl', 'a'],
      'XY': ['d', 'rh', 'bog']
    },
    chromosomesLength: {
      '1': 100000000,
      '2': 100000000,
      'XY': 70000000
    },
    geneList: {
      tail: {
        alleles: ['T', 'Tk', 't'],
        start: 10000000,
        length: 10584
      },
      metalic: {
        alleles: ['M', 'm'],
        start: 20000000,
        length: 259610
      },
      wings: {
        alleles: ['W', 'w'],
        start: 70000000,
        length: 9094
      },
      horns: {
        alleles: ['H', 'h'],
        start: 85000000,
        length: 19421
      },
      color: {
        alleles: ['C', 'c'],
        start: 15000000,
        length: 64572
      },
      black: {
        alleles: ['B', 'b'],
        start: 25000000,
        length: 17596
      },
      forelimbs: {
        alleles: ['Fl', 'fl'],
        start: 80000000,
        length: 122234
      },
      hindlimbs: {
        alleles: ['Hl', 'hl'],
        start: 85000000,
        length: 6371
      },
      armor: {
        alleles: ['A1', 'A2', 'a'],
        start: 90000000,
        length: 425156
      },
      dilute: {
        alleles: ['D', 'd', 'dl'],
        start: 20000000,
        length: 152673
      },
      bogbreath: {
        alleles: ['Bog', 'bog'],
        start: 22000000,
        length: 199642
      },
      nose: {
        alleles: ['Rh', 'rh'],
        start: 60000000,
        length: 2950
      }
    },
    alleleLabelMap: {
      'T': 'Long tail',
      'Tk': 'Kinked tail',
      't': 'Short tail',
      'M': 'Metallic',
      'm': 'Nonmetallic',
      'W': 'Wings',
      'w': 'No wings',
      'H': 'No horns',
      'h': 'Horns',
      'C': 'Colored',
      'c': 'Colorless',
      'Fl': 'Forelimbs',
      'fl': 'No forelimbs',
      'Hl': 'Hindlimbs',
      'hl': 'No hindlimbs',
      'A1': "'A1' armor",
      'A2': "'A2' armor",
      'a': "'a' armor",
      'B': 'Black',
      'b': 'Brown',
      'D': 'Full color',
      'd': 'Dilute color',
      'dl': 'dl',
      'Rh': 'Nose spike',
      'rh': 'No nose spike',
      'Bog': 'Normal metabolism',
      'bog': 'Bog breath',
      'Y': 'Y',
      '': ''
    },
    traitRules: {
      "armor": {
        "Five armor": [["A1", "A1"], ["A1", "A2"]],
        "Three armor": [["A1", "a"], ["A2", "A2"]],
        "One armor": [["A2", "a"]],
        "No armor": [["a", "a"]]
      },
      "tail": {
        "Long tail": [["T", "T"], ["T", "Tk"], ["T", "t"]],
        "Kinked tail": [["Tk", "Tk"], ["Tk", "t"]],
        "Short tail": [["t", "t"]]
      },
      "forelimbs": {
        "Forelimbs": [["Fl", "Fl"], ["Fl", "fl"]],
        "No forelimbs": [["fl", "fl"]]
      },
      "hindlimbs": {
        "Hindlimbs": [["Hl", "Hl"], ["Hl", "hl"]],
        "No hindlimbs": [["hl", "hl"]]
      },
      "horns": {
        "Hornless": [["H", "H"], ["H", "h"]],
        "Horns": [["h", "h"]]
      },
      "nose spike": {
        "Nose spike": [["Rh"]],
        "No nose spike": [["rh", "rh"], ["rh", "Y"]]
      },
      "wings": {
        "Wings": [["W", "W"], ["W", "w"]],
        "No wings": [["w", "w"]]
      },
      "color": {
        "Frost": [["c", "c"]],
        "Steel": [["C", "M", "B", "D"]],
        "Copper": [["C", "M", "b", "b", "D"]],
        "Silver": [["C", "M", "B", "d", "d"], ["C", "M", "B", "d", "dl"], ["C", "M", "B", "dl", "dl"], ["C", "M", "B", "d", "Y"], ["C", "M", "B", "dl", "Y"]],
        "Gold": [["C", "M", "b", "b", "d", "d"], ["C", "M", "b", "b", "d", "dl"], ["C", "M", "b", "b", "dl", "dl"], ["C", "M", "b", "b", "d", "Y"], ["C", "M", "b", "b", "dl", "Y"]],
        "Charcoal": [["C", "m", "m", "B", "D"]],
        "Lava": [["C", "m", "m", "b", "b", "D"]],
        "Ash": [["C", "m", "m", "B", "d", "d"], ["C", "m", "m", "B", "d", "dl"], ["C", "m", "m", "B", "dl", "dl"], ["C", "m", "m", "B", "d", "Y"], ["C", "m", "m", "B", "dl", "Y"]],
        "Sand": [["C", "m", "m", "b", "b", "d", "d"], ["C", "m", "m", "b", "b", "d", "dl"], ["C", "m", "m", "b", "b", "dl", "dl"], ["C", "m", "m", "b", "b", "d", "Y"], ["C", "m", "m", "b", "b", "dl", "Y"]]
      },
      "metabolism": {
        "Bog breath": [['bog', 'bog'], ['bog', 'Y']],
        "Normal metabolism": [['Bog', 'Bog'], ['Bog', 'bog'], ['Bog', 'Y']]
      },
      "liveliness": {
        "Alive": [["D"], ["d"]],
        "Dead": [["dl", "dl"], ["dl", "Y"]]
      }
    },
    /*
        Gets the image name based on the organism's characteristics.
        Requires the BioLogica.js library, and for org to be a BioLogica.js organism
    */

    getImageName: function(org) {
      var filename, limbs, trait, traitColor;
      trait = function(trait) {
        return org.getCharacteristic(trait);
      };
      if (trait("liveliness") === "Dead") {
        return "dead-drake.png";
      }
      filename = "";
      traitColor = trait("color");
      if (traitColor === "Silver") {
        traitColor = "Argent";
      } else if (traitColor === "Lava") {
        traitColor = "Earth";
      } else if (traitColor === "Ash") {
        traitColor = "Dust";
      }
      filename += traitColor.toLowerCase().substring(0, 2) + "_";
      filename += org.sex === BioLogica.FEMALE ? "f_" : "m_";
      filename += trait("wings") === "Wings" ? "wing_" : "noWing_";
      limbs = "";
      if (trait("forelimbs") === "Forelimbs") {
        if (trait("hindlimbs") === "Hindlimbs") {
          limbs = "allLimb_";
        } else {
          limbs = "fore_";
        }
      } else if (trait("hindlimbs") === "Hindlimbs") {
        limbs = "hind_";
      } else {
        limbs = "noLimb_";
      }
      filename += limbs;
      filename += (function() {
        switch (trait("armor")) {
          case "Five armor":
            return "a5_";
          case "Three armor":
            return "a3_";
          case "One armor":
            return "a1_";
          default:
            return "a0_";
        }
      })();
      filename += (function() {
        switch (trait("tail")) {
          case "Long tail":
            return "flair_";
          case "Kinked tail":
            return "kink_";
          default:
            return "short_";
        }
      })();
      filename += trait("horns") === "Horns" ? "horn_" : "noHorn_";
      filename += trait("nose spike") === "Nose spike" ? "rostral_" : "noRostral_";
      filename += trait("metabolism") === "Bog breath" ? "bogbreath" : "healthy";
      return filename += ".png";
    },
    /*
    */

    makeAlive: function(org) {
      var chromsome, replacementAllele, xChromoName;
      if (org.getCharacteristic("liveliness") === "Dead") {
        xChromoName = org.sex === BioLogica.MALE ? "x" : ExtMath.flip() ? "x1" : "x2";
        chromsome = org.getGenotype().chromosomes["XY"][xChromoName];
        replacementAllele = ExtMath.flip() ? "D" : "d";
        org.getGenotype().replaceAllele(chromsome, "dl", replacementAllele);
        return org.resetPhenotype();
      }
    }
  };

}).call(this);
