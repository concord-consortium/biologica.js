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

  it("a hetwerozygous parent with homozygous rec parent, we expect a 50% of offspring to have the dominant trait", function() {
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

    expect(wings/times).toBeBetween(0.47,0.53);
  });
});