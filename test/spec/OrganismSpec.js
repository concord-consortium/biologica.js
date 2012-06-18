describe("An organism", function() {
  it("can be created with a species, sex and alleles", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, BioLogica.FEMALE, "a:h,b:h");
    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.FEMALE);
    expect(org.alleles).toBe("a:h,b:h");
  });
});