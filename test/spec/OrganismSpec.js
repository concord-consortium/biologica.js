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
});