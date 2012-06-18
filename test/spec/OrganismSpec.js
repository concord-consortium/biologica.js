describe("An organism", function() {
  it("can be created with a species, sex and alleles", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, BioLogica.FEMALE, "a:h,b:h");

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.FEMALE);
    expect(org.alleles).toBe("a:h,b:h");
  });

  // it("has chromosomes as defined by the species", function() {
  //   var org = new BioLogica.Organism(BioLogica.Species.Drake, BioLogica.FEMALE, "a:h,b:h");

  //   expect(org.chromosomes[1]).toExist();
  //   expect(org.chromosomes[2]).toExist();
  //   expect(org.chromosomes.X).toExist();
  //   expect(org.chromosomes.Y).toExist();
  //   expect(org.chromosomes.Z).not.toExist();
  // });
});