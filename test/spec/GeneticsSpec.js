describe("An organism's genetics", function() {
  it("is created when an organism is created", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, BioLogica.FEMALE, "");

    expect(org.genetics).toExist();
  });

  it("correctly identifies alleles as belonging to genes", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, "");

    expect(genetics.isAlleleOfGene("T", "T")).toBe(true);
    expect(genetics.isAlleleOfGene("dl", "D")).toBe(true);
    expect(genetics.isAlleleOfGene("Rh", "rh")).toBe(true);
    expect(genetics.isAlleleOfGene("rh", "D")).toBe(false);
  });

  it("correctly filters a set of alleles", function() {
    var genetics = new BioLogica.Genetics(BioLogica.Species.Drake, ""),
        alleles = ["Tk", "m", "W", "dl"],
        geneFilter = ["T", "D"],
        filteredAlleles = genetics.filter(alleles, geneFilter);

    expect(filteredAlleles).toContain("Tk");
    expect(filteredAlleles).toContain("dl");
    expect(filteredAlleles).not.toContain("m");
    expect(filteredAlleles).not.toContain("W");
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