describe("When we breed", function() {
  it("two organisms with homozygous dominant alleles, we expect a child with the dominant trait", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:H,b:H", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "a:H,b:H", BioLogica.MALE),
        child = BioLogica.breed(mother, father);

    expect(child).toHaveCharacteristic("horns", "Hornless");

    mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:T", BioLogica.FEMALE),
    father = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:T", BioLogica.MALE),
    child = BioLogica.breed(mother, father);

    expect(child).toHaveCharacteristic("tail", "Long tail");
  });

  it("two organisms with homozygous recessive alleles, we expect a child with the recessive trait", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:w,b:w", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "a:w,b:w", BioLogica.MALE),
        child = BioLogica.breed(mother, father);

    expect(child).toHaveCharacteristic("wings", "No wings");

    mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:rh,b:rh", BioLogica.FEMALE),
    father = new BioLogica.Organism(BioLogica.Species.Drake, "a:rh", BioLogica.MALE),
    child = BioLogica.breed(mother, father);

    expect(child).toHaveCharacteristic("nose spike", "No nose spike");
  });

  it("a parent with homozygous dom and a parent with homozygous rec, we expect a child with the dominant trait", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:Hl,b:Hl", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "a:hl,b:hl", BioLogica.MALE),
        child = BioLogica.breed(mother, father);

    expect(child).toHaveCharacteristic("hindlimbs", "Hindlimbs");

    mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:fl,b:fl", BioLogica.FEMALE),
    father = new BioLogica.Organism(BioLogica.Species.Drake, "a:Fl,b:Fl", BioLogica.MALE),
    child = BioLogica.breed(mother, father);

    expect(child).toHaveCharacteristic("forelimbs", "Forelimbs");
  });

  it("a heterozygous parent with homozygous rec parent, we expect 50% of offspring to have the dominant trait", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:w,b:w", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "a:W,b:w", BioLogica.MALE),
        child,
        wings = noWings = 0;
        times = 1000, _times = times;

    while (_times--) {
      child = BioLogica.breed(mother, father);
      hasWings = child.getCharacteristic("wings") == "Wings";
      if (hasWings) {
        wings++;
      } else {
        noWings++;
      }
    }

    expect(wings/times).toBeBetween(0.45,0.55);
  });

  it("two heterozygous parents, we expect 75% of offspring to have the dominant trait", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:W,b:w", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "a:W,b:w", BioLogica.MALE),
        child,
        wings = noWings = 0;
        times = 1000, _times = times;

    while (_times--) {
      child = BioLogica.breed(mother, father);
      hasWings = child.getCharacteristic("wings") == "Wings";
      if (hasWings) {
        wings++;
      } else {
        noWings++;
      }
    }

    expect(wings/times).toBeBetween(0.7,0.8);
  });

  it("a TFtf parent with recessive parent, we expect tails and forelimbs to be independent in offspring", function() {
    var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:Fl,b:fl", BioLogica.FEMALE),
        father = new BioLogica.Organism(BioLogica.Species.Drake, "a:t,b:t,a:fl,b:fl", BioLogica.MALE),
        child,
        TF = Tf = tF = tf = 0;
        times = 1000, _times = times;

    while (_times--) {
      child = BioLogica.breed(mother, father);
      hasLongTail = child.getCharacteristic("tail") == "Long tail";
      hasForelimbs = child.getCharacteristic("forelimbs") == "Forelimbs";
      if (hasLongTail && !hasForelimbs) {
        TF++;
      } else if (hasLongTail && hasForelimbs) {
        Tf++;
      } else if (!hasLongTail && !hasForelimbs) {
        tF++;
      } else if (!hasLongTail && hasForelimbs) {
        tf++;
      }
    }

    expect(TF/times).toBeBetween(0.2,0.3);
    expect(Tf/times).toBeBetween(0.2,0.3);
    expect(tF/times).toBeBetween(0.2,0.3);
    expect(tf/times).toBeBetween(0.2,0.3);
  });

  describe("without crossover", function() {
    it("a heterozygous TWtw parent and a rec parent, any offspring with long tail should have wings and vice versa", function() {
      var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:W,b:w", BioLogica.FEMALE),
          father = new BioLogica.Organism(BioLogica.Species.Drake, "a:t,b:t,a:w,b:w", BioLogica.MALE),
          child,
          TW = tw = neither = 0,
          times = 1000, _times = times;

      while (_times--) {
        child = BioLogica.breed(mother, father, false);
        hasWings = child.getCharacteristic("wings") == "Wings";
        hasLongTail = child.getCharacteristic("tail") == "Long tail";
        if (hasWings && hasLongTail) {
          TW++;
        } else if (!hasWings && !hasLongTail){
          tw++;
        } else {
          neither++;
        }
      }

      expect(neither).toBe(0);
      expect(TW + tw).toBe(times);
      expect(TW/times).toBeBetween(0.45,0.55);
    })
  });

  describe("with crossover", function() {
    it("a heterozygous TWtw parent and a rec parent, 36% of offspring with long tail should have no wings or vice versa", function() {
      var mother = new BioLogica.Organism(BioLogica.Species.Drake, "a:T,b:t,a:W,b:w", BioLogica.FEMALE),
          father = new BioLogica.Organism(BioLogica.Species.Drake, "a:t,b:t,a:w,b:w", BioLogica.MALE),
          child,
          TW = tw = neither = 0,
          times = 1000, _times = times;

      while (_times--) {
        child = BioLogica.breed(mother, father);
        hasWings = child.getCharacteristic("wings") == "Wings";
        hasLongTail = child.getCharacteristic("tail") == "Long tail";
        if (hasWings && hasLongTail) {
          TW++;
        } else if (!hasWings && !hasLongTail){
          tw++;
        } else {
          neither++;
        }
      }

      expect(neither/times).toBeBetween(0.30,0.42);
    })
  });
});