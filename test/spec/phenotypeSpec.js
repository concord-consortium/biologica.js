var wingsHetero =  "a:t,b:T,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var wingsHomoDom = "a:t,b:T,a:m,b:m,a:W,b:W,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var noWings =      "a:t,b:T,a:m,b:m,a:w,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var noWingsShortTail = "a:t,b:t,a:m,b:m,a:w,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var steel =  "a:t,b:T,a:M,b:M,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:B,b:b,a:d,b:D,a:rh,b:rh,a:Bog";
var sand =   "a:t,b:T,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var albino = "a:t,b:T,a:M,b:M,a:W,b:w,a:h,b:h,a:c,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:B,b:b,a:d,b:D,a:rh,b:rh,a:Bog";
var female = BioLogica.FEMALE,
    male   = BioLogica.MALE;
function drake(alleles, sex) {
  return new BioLogica.Organism(BioLogica.Species.Drake, alleles, sex);
}
function changes(org1, org2) {
  return BioLogica.Phenotype.numberOfChangesToReachPhenotype(org1, org2, BioLogica.Species.Drake);
}

describe("The Phenotype library", function() {
  describe("correctly calculates the number of changes to reach a phenotype", function() {

    it("with same phenotype", function() {
      var org1 = drake(wingsHetero, female),
          org2 = drake(wingsHomoDom, female);
      expect(changes(org1, org2)).toBe(0);
    });

    it("with just a sex change", function() {
      var org1 = drake(wingsHetero, female),
          org2 = drake(wingsHetero, male);
      expect(changes(org1, org2)).toBe(1);
    });

    it("from homo dom to recessive", function() {
      var org1 = drake(wingsHomoDom, female),
          org2 = drake(noWings, female);
      expect(changes(org1, org2)).toBe(2);
    });

    it("from hetero to recessive", function() {
      var org1 = drake(wingsHetero, female),
          org2 = drake(noWings, female);
      expect(changes(org1, org2)).toBe(1);
    });

    it("with multiple changes", function() {
      var org1 = drake(wingsHomoDom, female),
          org2 = drake(noWingsShortTail, male);
      expect(changes(org1, org2)).toBe(4);
    });

    it("from one color to another", function() {
      var org1 = drake(steel, female),
          org2 = drake(sand, female);
      expect(changes(org1, org2)).toBe(4);
      expect(changes(org2, org1)).toBe(3);
    });

    it("from one color to albino", function() {
      var org1 = drake(steel, female),
          org2 = drake(albino, female);
      expect(changes(org1, org2)).toBe(1);
    });

  });
});
