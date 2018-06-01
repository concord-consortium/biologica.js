describe("An organism's genetics", function() {
  it("is created when an organism is created", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE);

    expect(org.genetics).toExist();
  });

  it("creates a genotype when an organism is created with an alleleString", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:H,a:t,b:Tk,a:c,b:C,a:W,b:w,a:d,b:D", BioLogica.FEMALE),
        chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["1"].a.alleles).toContain("t");
    expect(chromosomes["1"].a.alleles).toContain("W");
    expect(chromosomes["1"].b.alleles).toContain("Tk");
    expect(chromosomes["1"].b.alleles).toContain("w");
    expect(chromosomes["1"].a.alleles).toContain("h");
    expect(chromosomes["1"].b.alleles).toContain("H");

    expect(chromosomes["2"].a.alleles).toContain("c");
    expect(chromosomes["2"].b.alleles).toContain("C");

    expect(chromosomes["XY"].x1.alleles).toContain("d");
    expect(chromosomes["XY"].x2.alleles).toContain("D");
  });

  it("creates male or female chromosomes when organisms are created with alleleStrings", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:d,b:D", BioLogica.FEMALE),
        chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["XY"].x1.alleles).toContain("d");
    expect(chromosomes["XY"].x2.alleles).toContain("D");

    org = new BioLogica.Organism(BioLogica.Species.Drake, "a:D", BioLogica.MALE),
        chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["XY"].x.alleles).toContain("D");
    expect(chromosomes["XY"].y.alleles.length).toBe(0);
  });

  it("creates genotype when an organism is created with a genotype specification", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake,
                {
                  "1": {
                    "a": ["t", "W"],
                    "b": ["Tk", "w"]
                  },
                  "2": {
                    "a": ["h"],
                    "b": ["H"]
                  },
                  "XY": {
                    "a": ["dl"]
                  }
                }, BioLogica.FEMALE),
        chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["1"].a.alleles).toContain("t");
    expect(chromosomes["1"].a.alleles).toContain("W");
    expect(chromosomes["1"].b.alleles).toContain("Tk");
    expect(chromosomes["1"].b.alleles).toContain("w");

    expect(chromosomes["2"].a.alleles).toContain("h");
    expect(chromosomes["2"].b.alleles).toContain("H");

    expect(chromosomes["XY"].a.alleles).toContain("dl");
  });

  it("creates complete genotype when an organism is created with an under-specified alleleString", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:H", BioLogica.FEMALE),
        chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["1"].a.alleles.length).toBe(4);
    expect(chromosomes["1"].b.alleles.length).toBe(4);
    expect(chromosomes["2"].a.alleles.length).toBe(5);
    expect(chromosomes["2"].b.alleles.length).toBe(5);
    expect(chromosomes["XY"].x1.alleles.length).toBe(3);
    expect(chromosomes["XY"].x2.alleles.length).toBe(3);

    var chromo1A = chromosomes["1"].a;
    expect(chromo1A.alleles).toContainAnyOneOf(["t", "T", "Tk"]);
    expect(chromo1A.alleles).toContainAnyOneOf(["m", "M"]);
    expect(chromo1A.alleles).toContainAnyOneOf(["w", "W"]);
    expect(chromo1A.alleles).not.toContainAnyOneOf(["c", "C"]);
  });

  it("contains chromosomes that are correctly named", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["1"].a.side).toBe("a");
    expect(chromosomes["1"].b.side).toBe("b");
    expect(chromosomes["XY"].x1.side).toBe("x1");
    expect(chromosomes["XY"].x2.side).toBe("x2");

    org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.MALE),
    chromosomes = org.getGenotype().chromosomes;

    expect(chromosomes["XY"].x.side).toBe("x");
    expect(chromosomes["XY"].y.side).toBe("y");
  });

  describe("when performing meiosis", function(){
    it("will get four cells", function() {
      var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
          cells = org.genetics.performMeiosis().cells;

      expect(cells.length).toBe(4);
    });

    it("will have each cell be haploid", function() {
      var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
          cells = org.genetics.performMeiosis().cells;

      for (var i=0; i<4; i++) {
        cell = cells[i];
        expect(cell["1"]).toExist();
        expect(cell["1"].side).toBe("a");
        expect(cell["1"].alleles).toExist();
        expect(cell["1"].alleles.length).toBe(4);
        expect(cell["2"]).toExist();
        expect(cell["XY"]).toExist();
        expect(cell["XY"].side).toBe('x');
      }
    });

    it("will have half the haplod cells of a male be Y", function() {
      var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.MALE),
          cells = org.genetics.performMeiosis().cells,
          numX = numY = 0;

      for (var i=0; i<4; i++) {
        cell = cells[i];
        if (cell["XY"].side === "x") {
          numX++;
        } else if (cell["XY"].side === "y") {
          numY++;
        }
      }

      expect(numX).toBe(2);
      expect(numY).toBe(2);
    });

    it("will create any number of gametes", function() {
      var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE);

      expect(org.createGametes(1)).toExist();
      expect(org.createGametes(4).length).toBe(4);
      expect(org.createGametes(19).length).toBe(19);
    });

    it("will independently assort chromosomes to gametes", function() {
      var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:C,b:c", BioLogica.FEMALE),
          numGametes = 4, _numGametes,
          sameSide = oppSide = 0,
          times = 1000, _times = times;

      while (_times--) {
        var gametes = org.createGametes(numGametes, false);
        _numGametes = numGametes;
        while (_numGametes--) {
          gamete = gametes[_numGametes];
          chr1Alleles = gamete[1].alleles;
          chr2Alleles = gamete[2].alleles;
          if (~chr1Alleles.indexOf("T") && ~chr2Alleles.indexOf("C") ||
            ~chr1Alleles.indexOf("t") && ~chr2Alleles.indexOf("c")) {
            sameSide++;
          } else {
            oppSide++;
          }
        }
      }
      expect(sameSide/(times*numGametes)).toBeBetween(0.47,0.53);
    });

    describe("and when not performing crossover", function() {

      it("will create gametes with perfectly linked genes", function() {
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:M,b:m", BioLogica.FEMALE),
            numGametes = 4, _numGametes,
            TM = tm = 0,
            times = 1000, _times = times;

        while (_times--) {
          var gametes = org.createGametes(numGametes, false);
          _numGametes = numGametes;
          while (_numGametes--) {
            gamete = gametes[_numGametes];
            chr1Alleles = gamete[1].alleles;
            if (~chr1Alleles.indexOf("T") && ~chr1Alleles.indexOf("M")) {
              TM++;
            } else if (~chr1Alleles.indexOf("t") && ~chr1Alleles.indexOf("m")) {
              tm++;
            }
          }
        }
        expect(TM + tm).toBe(times*numGametes);
        expect(TM/(times*numGametes)).toBeBetween(0.475,0.525);
      })
    });

    describe("and when performing crossover", function() {

      it("will select between no more than 3 crossover points", function() {
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
            chr1 = org.getGenotype().chromosomes[1]["a"],
            times = 100;
        while (times--) {
          numPoints = org.genetics.createCrossoverPoints(chr1).length
          expect(numPoints).toBeLessThan(4);
        }
      });

      it("will select between 0-3 crosses with the right frequency of each", function() {
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
            chr1 = org.getGenotype().chromosomes[1]["a"],
            numCrossovers = [0,0,0,0],
            times = 5000, _times = times;

        while (_times--) {
          numPoints = org.genetics.createCrossoverPoints(chr1).length
          numCrossovers[numPoints]++;
        }

        _times = times;

        // we should have somewhere around 11% no crosses, 27% one cross, 30% two
        // crosses, and 32% for 3 (it includes all the ones that would have had more than 3)
        expect(numCrossovers[0]/_times).toBeBetween(0.08, 0.14);
        expect(numCrossovers[1]/_times).toBeBetween(0.24, 0.31);
        expect(numCrossovers[2]/_times).toBeBetween(0.26, 0.34);
        expect(numCrossovers[3]/_times).toBeBetween(0.28, 0.36);
      });

      it("the average crossover position will be at 50cM", function() {
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
            chr1 = org.getGenotype().chromosomes[1]["a"],
            crossoverLocations = [],
            sum = 0, avr = 0,
            times = 5000, _times = times;

        while (_times--) {
          crossoverLocations = crossoverLocations.concat(org.genetics.createCrossoverPoints(chr1));
        }
        _times = times;
        while (_times--) {
          sum += crossoverLocations[_times];
        }
        avr = sum/times;
        // expect 50,000,000
        expect(avr).toBeBetween(49000000, 51000000);
      });

      it("can cross two chromatids at a given point", function() {
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:M,b:m,a:W,b:w", BioLogica.FEMALE),
            chr1 = org.getGenotype().chromosomes[1]["a"],   // TMW
            chr2 = org.getGenotype().chromosomes[1]["b"];   // tmw

        newChromatids = org.genetics.crossChromatids(chr1, chr2, 0);
        expect(newChromatids[1].alleles).toContainAllOf(["T", "M", "W"]);
        expect(newChromatids[0].alleles).toContainAllOf(["t", "m", "w"]);

        newChromatids = org.genetics.crossChromatids(chr1, chr2, 10000000);
        expect(newChromatids[1].alleles).toContainAllOf(["T", "M", "W"]);
        expect(newChromatids[0].alleles).toContainAllOf(["t", "m", "w"]);

        newChromatids = org.genetics.crossChromatids(chr1, chr2, 10000001);
        expect(newChromatids[1].alleles).toContainAllOf(["t", "M", "W"]);
        expect(newChromatids[0].alleles).toContainAllOf(["T", "m", "w"]);

        newChromatids = org.genetics.crossChromatids(chr1, chr2, 20000001);
        expect(newChromatids[1].alleles).toContainAllOf(["t", "m", "W"]);
        expect(newChromatids[0].alleles).toContainAllOf(["T", "M", "w"]);
      });

      it("should separate T and M in 9% of gametes", function() {
        // T and M are 10cM apart. The probablility of one cross between them is 10%, and there is
        // a small chance of 2 or 3 crosses between them.
        // From http://en.wikipedia.org/wiki/Centimorgan#Relation_to_the_probability_of_recombination,
        // we expect p[recombination|distance of 10cM] to be (1 - e^(-20/100)) / 2 = 0.0906 = 9%
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:M,b:m", BioLogica.FEMALE),
            times = 2000, _times = times,
            numGametes = 16, _numGametes = numGametes,
            gametesChr1 = [],
            notSplit = split = 0;

        while (_times--) {
          var gametes = org.createGametes(numGametes, true);
          _numGametes = numGametes;
          while (_numGametes--) {
            gametesChr1.push(gametes[_numGametes][1]);
          }
        }
        _times = times * numGametes;
        while (_times--) {
          var chr1Alleles = gametesChr1[_times].alleles;
          if ((~chr1Alleles.indexOf("T") && ~chr1Alleles.indexOf("M")) ||
            (~chr1Alleles.indexOf("t") && ~chr1Alleles.indexOf("m"))) {
            notSplit++;
          } else {
            split++;
          }
        }
        expect(split/(times * numGametes)).toBeBetween(0.08,0.10);
      });

      it("should separate T and W in 36% of gametes", function() {
        // Normally we'd expect
        // p[recombination|distance of 60cM] to be (1 - e^(-60/100)) / 2 = 0.349 = 35%
        // However, we cap the number of crossovers at 3, so this slightly increases the probability
        // of getting an odd number of splits. Without fully doing the calculation, 36% separation
        // seems about right
        var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:W,b:w", BioLogica.FEMALE),
            times = 2000, _times = times,
            numGametes = 16, _numGametes = numGametes,
            gametesChr1 = [],
            notSplit = split = 0;

        while (_times--) {
          var gametes = org.createGametes(numGametes, true);
          _numGametes = numGametes;
          while (_numGametes--) {
            gametesChr1.push(gametes[_numGametes][1]);
          }
        }
        _times = times * numGametes;
        while (_times--) {
          var chr1Alleles = gametesChr1[_times].alleles;
          if ((~chr1Alleles.indexOf("T") && ~chr1Alleles.indexOf("W")) ||
            (~chr1Alleles.indexOf("t") && ~chr1Alleles.indexOf("w"))) {
            notSplit++;
          } else {
            split++;
          }
        }
        expect(split/(times * numGametes)).toBeBetween(0.32,0.40);
      });
    });
  });
});

describe("An species' genetics", function() {
  it("correctly identifies alleles as belonging to genes", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE);

    expect(genetics.isAlleleOfGene("T", "T")).toBe(true);
    expect(genetics.isAlleleOfGene("d", "D")).toBe(true);
    expect(genetics.isAlleleOfGene("Rh", "rh")).toBe(true);
    expect(genetics.isAlleleOfGene("rh", "D")).toBe(false);
  });

  it("correctly returns the gene for a specific allele", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE);

    expect(genetics.geneForAllele("T")).toBe('tail');
    expect(genetics.geneForAllele("d")).toBe('dilute');
    expect(genetics.geneForAllele("Rh")).toBe('nose');
    expect(genetics.geneForAllele("rh")).toBe('nose');
  });

  it("correctly finds the chromosome an allele belongs to", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE);

    expect(genetics.findChromosome("t")).toBe("1");
    expect(genetics.findChromosome("Fl")).toBe("2");
    expect(genetics.findChromosome("d")).toBe("XY");

    expect(genetics.findChromosome("zzz")).toBe(false);
  });

  it("correctly filters a set of alleles", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        alleles = ["Tk", "m", "W", "d"],
        geneFilter = ["T", "D"],
        filteredAlleles = genetics.filter(alleles, geneFilter);

    expect(filteredAlleles).toContain("Tk");
    expect(filteredAlleles).toContain("d");
    expect(filteredAlleles).not.toContain("m");
    expect(filteredAlleles).not.toContain("W");
  });

  it("correctly converts an allele string into genotype", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        alleles = "a:c,b:C,a:t,b:Tk,b:dl,a:W,b:w,a:d",
        chromosomes =genetics.convertAlleleStringToGenotypeHash(alleles, BioLogica.FEMALE);

    expect(chromosomes["1"].a).toContain("t");
    expect(chromosomes["1"].a).toContain("W");
    expect(chromosomes["1"].b).toContain("Tk");
    expect(chromosomes["1"].b).toContain("w");

    expect(chromosomes["2"].a).toContain("c");
    expect(chromosomes["2"].b).toContain("C");

    expect(chromosomes["XY"].x1).toContain("d");
  });

  it("finds if a chromosome contains a gene", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        chromosome = ["h", "A2"];

    expect(genetics.chromosomeContainsGene(chromosome, "h")).toBe(true);
    expect(genetics.chromosomeContainsGene(chromosome, "a")).toBe(true);
    expect(genetics.chromosomeContainsGene(chromosome, "hl")).toBe(false);
  });

  it("can create a random allele of a gene", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, ""),
        allele1 = genetics.getRandomAllele("h"),
        allele2 = genetics.getRandomAllele("a");

    expect(allele1).toBeAnyOneOf(["h", "H"]);
    expect(allele2).toBeAnyOneOf(["A1", "A2", "a"]);
  });

  it("can create a random alleles that are uniformly distributed", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        alleleCounts = {A1: 0, A2: 0, a: 0},
        i = 10000,
        allele;
    while(i--)
    {
      allele = genetics.getRandomAllele("a");
      alleleCounts[allele]++;
    }

    // expect 3333 for all
    expect(alleleCounts.A1).toBeBetween(3150, 3550);
    expect(alleleCounts.A2).toBeBetween(3150, 3550);
    expect(alleleCounts.a).toBeBetween(3150, 3550);
  });

  it("can create a complete chromosome object from an under-specified alleleString", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "a:h,b:H", BioLogica.FEMALE),
        chromosomes =genetics.genotype.chromosomes;

    expect(chromosomes["1"].a.alleles.length).toBe(4)
    expect(chromosomes["1"].b.alleles.length).toBe(4)
    expect(chromosomes["2"].a.alleles.length).toBe(5)
    expect(chromosomes["2"].b.alleles.length).toBe(5)
    expect(chromosomes["XY"].x1.alleles.length).toBe(3)
    expect(chromosomes["XY"].x2.alleles.length).toBe(3)

    var chromo1A = chromosomes["1"].a;
    expect(chromo1A.alleles).toContainAnyOneOf(["t", "T", "Tk"]);
    expect(chromo1A.alleles).toContainAnyOneOf(["m", "M"]);
    expect(chromo1A.alleles).toContainAnyOneOf(["w", "W"]);
    expect(chromo1A.alleles).not.toContainAnyOneOf(["c", "C"]);
  });

});

describe("The Genotype object", function() {
  it("correctly checks to see if it contains given alleles", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "a:h,b:H,a:t,b:Tk,a:W,b:w,a:rh", BioLogica.MALE),
        genotype =genetics.genotype;

    expect(genotype.containsAlleles(["h"])).toBe(true)
    expect(genotype.containsAlleles(["h","H","t"])).toBe(true)
    expect(genotype.containsAlleles(["z"])).toBe(false)
    expect(genotype.containsAlleles(["h", "z", "t"])).toBe(false)
    expect(genotype.containsAlleles(["rh"])).toBe(true)
    expect(genotype.containsAlleles(["rh", "rh"])).toBe(false)
    expect(genotype.containsAlleles([])).toBe(true)
  });

  it("can be converted back into a string", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:H,b:H", BioLogica.FEMALE),
      father = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:h", BioLogica.MALE),
      child = BioLogica.breed(mother, father);

    expect(typeof mother.getAlleleString()).toBe("string");
    expect(mother.getAlleleString().length).toBeGreaterThan(10);

    expect(typeof child.getAlleleString()).toBe("string");
    expect(child.getAlleleString()).toContain("a:H,b:h");
  });

  it("can be converted back into a string and the converted string doesn't contain 'undefined'", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:H,b:H", BioLogica.FEMALE),
      father = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:h", BioLogica.MALE),
      times = 4;

    // ensure no male child has 'undefined' alleles on b-side of XY
    while (times--) {
      child = BioLogica.breed(mother, father);
      expect(child.getAlleleString()).not.toContain("undefined");
    }
  });

  it("can be converted back into a string for specific genes", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:H,b:H", BioLogica.FEMALE),
      father = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:h", BioLogica.MALE),
      child = BioLogica.breed(mother, father);

    expect(typeof mother.genetics.genotype.getAlleleString(['horns'], mother.genetics)).toBe("string");
    expect(mother.genetics.genotype.getAlleleString(['horns'], mother.genetics)).toEqual("a:H,b:H");

    expect(typeof child.genetics.genotype.getAlleleString(['horns'], child.genetics)).toBe("string");
    expect(child.genetics.genotype.getAlleleString(['horns'], child.genetics)).toEqual("a:H,b:h");
  });

  it('can be converted back into a string for specific traits', function () {

    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:C,b:C,a:m,b:m,a:b,b:b,a:D,b:D", BioLogica.FEMALE),
      father = new BioLogica.Organism(BioLogica.Species.Drake, "a:c,b:c,a:M,b:M,a:B,b:B,a:d,b:d", BioLogica.MALE),
      child = BioLogica.breed(mother, father);

    while (child.sex === BioLogica.MALE) {
      child = BioLogica.breed(mother, father);
    }

    motherVal = mother.genetics.getAlleleStringForTrait('color');
    expect(typeof motherVal).toBe("string");
    expect(motherVal).toEqual("a:m,b:m,a:C,b:C,a:b,b:b,a:D,b:D");

    childVal = child.genetics.getAlleleStringForTrait('color');
    expect(typeof childVal).toBe("string");
    expect(childVal).toEqual("a:m,b:M,a:C,b:c,a:b,b:B,a:D,b:d");

    motherVal = mother.getAlleleStringForTrait('color');
    expect(typeof motherVal).toBe("string");
    expect(motherVal).toEqual("a:m,b:m,a:C,b:C,a:b,b:b,a:D,b:D");

    childVal = child.getAlleleStringForTrait('color');
    expect(typeof childVal).toBe("string");
    expect(childVal).toEqual("a:m,b:M,a:C,b:c,a:b,b:B,a:D,b:d");
  });
});

describe("The Genetics library", function() {
  it("correctly parses an allele string into the two sides", function() {
    var alleles = BioLogica.Genetics.parseAlleleString("a:h,b:H,a:t,b:t,a:Dl,b:D");

    expect(alleles.a).toContain("h");
    expect(alleles.a).toContain("t");
    expect(alleles.a).toContain("Dl");

    expect(alleles.b).toContain("H");
    expect(alleles.b).toContain("t");
    expect(alleles.b).toContain("D");
  });
});

describe("BioLogica", function() {
  it("can breed together two organisms", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.MALE),
        child = BioLogica.breed(mother, father);

    expect(child).toExist();
    expect(child.species).toBe(BioLogica.Species.Drake);
  });

  it("can breed together two organisms and child should have all its chromosomes", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "", BioLogica.MALE),
        child = BioLogica.breed(mother, father);

    expect(child.genetics).toExist();
    expect(child.sex).toBeAnyOneOf([BioLogica.FEMALE, BioLogica.MALE]);
    expect(child.genetics.genotype.chromosomes["1"]).toExist();
    expect(child.genetics.genotype.chromosomes["1"].a).toExist();
    expect(child.genetics.genotype.chromosomes["1"].b).toExist();
    expect(child.genetics.genotype.chromosomes["2"]).toExist();
    expect(child.genetics.genotype.chromosomes["1"].a).toExist();
    expect(child.genetics.genotype.chromosomes["1"].b).toExist();
    expect(child.genetics.genotype.chromosomes["XY"]).toExist();
    if (child.sex === BioLogica.FEMALE) {
      expect(child.genetics.genotype.chromosomes["XY"].x1).toExist();
      expect(child.genetics.genotype.chromosomes["XY"].x2).toExist();
    } else {
      expect(child.genetics.genotype.chromosomes["XY"].x).toExist();
      expect(child.genetics.genotype.chromosomes["XY"].y).toExist();
    }
  });
});
