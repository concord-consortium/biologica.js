// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  BioLogica.Genetics = (function() {

    function Genetics(species, alleles, sex) {
      var genotypeHash;
      this.species = species;
      this.alleles = alleles;
      genotypeHash = typeof this.alleles === "string" ? this.convertAlleleStringToGenotypeHash(this.alleles, sex) : this.alleles;
      this.topUpChromosomes(genotypeHash);
      this.genotype = new BioLogica.Genotype(this.species, genotypeHash);
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
      a: (_ref = alleleString.match(/a:([^,])*/g)) != null ? _ref.map(function(short) {
        return short.match(/[^:]+$/)[0];
      }) : void 0,
      b: (_ref1 = alleleString.match(/b:([^,])*/g)) != null ? _ref1.map(function(short) {
        return short.match(/[^:]+$/)[0];
      }) : void 0
    };
  };

}).call(this);
