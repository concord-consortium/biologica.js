describe("An organism", function() {
  it("can be created with a species, alleles and sex", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:h", BioLogica.FEMALE);

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.FEMALE);
    expect(org.alleles).toBe("a:h,b:h");
  });

  it("can be created with a species and chromosome hash, and sex will be determined", function() {
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
          "x1": ["D"],
          "x2": ["dl"]
        }
      });

    expect(org.sex).toBe(BioLogica.FEMALE);

    org = new BioLogica.Organism(BioLogica.Species.Drake,
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
          "x": ["D"],
          "y": []
        }
      });

    expect(org.sex).toBe(BioLogica.MALE);
  });

  it("can be created with just a species", function() {
    var org = BioLogica.Organism.createOrganism(BioLogica.Species.Drake);

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBeAnyOneOf([BioLogica.FEMALE, BioLogica.MALE]);
    expect(org.alleles).toBe("");
  });


  it("can be created with an alleleString with a trailing comma", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:h,", BioLogica.FEMALE);

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.FEMALE);
    expect(org.alleles).toBe("a:h,b:h");
  });


  it("can be created with a species, alleles and male sex, and Y chromosome will be correct", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:rh,b:rh", BioLogica.MALE);

    expect(org.species.name).toBe("Drake");
    expect(org.sex).toBe(BioLogica.MALE);
    expect(org.genetics.genotype.chromosomes['XY']['y'].alleles.length).toBe(0);
  });

  it("can provide an alleleString when created by a genotype", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake,
      {
        "1": {
          "a": ["W", "t", "h", "M"],
          "b": ["Tk", "w", "H", "m"]
        },
        "2": {
          "a": ["C","B","fl","Hl","A1"],
          "b": ["c","b", "fl","hl","A2"]
        },
        "XY": {
          "x1": ["D","Rh","Bog"],
          "x2": ["dl","Rh","bog"]
        }
      });

    expect(org.genetics.genotype.getAlleleString())
      .toBe("a:t,b:Tk,a:M,b:m,a:W,b:w,a:h,b:H,a:C,b:c,a:B,b:b,a:fl,b:fl,a:Hl,b:hl,a:A1,b:A2,a:D,b:dl,a:Bog,b:bog,a:Rh,b:Rh");
  });

  it("can provide an alleleString when created by an incomplete alleleString", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, "a:h,b:H", BioLogica.MALE),
        alleleString = org.genetics.genotype.getAlleleString();

    expect(alleleString.indexOf("a:h")).toBeGreaterThan(-1);
    expect(alleleString.indexOf("b:H")).toBeGreaterThan(-1);
    expect(!!~alleleString.indexOf("a:Rh") || !!~alleleString.indexOf("a:rh")).toBe(true);
    expect(!!~alleleString.indexOf("b:Rh") || !!~alleleString.indexOf("b:rh")).toBe(false);
  });
});
