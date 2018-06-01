var wingsHetero =  "a:t,b:T,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var wingsHomoDom = "a:t,b:T,a:m,b:m,a:W,b:W,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var noWings =      "a:t,b:T,a:m,b:m,a:w,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var noWingsShortTail = "a:t,b:t,a:m,b:m,a:w,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var steel =  "a:t,b:T,a:M,b:M,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:B,b:b,a:d,b:D,a:rh,b:rh,a:Bog";
var sand =   "a:t,b:T,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:d,a:rh,b:rh,a:Bog";
var albino = "a:t,b:T,a:M,b:M,a:W,b:w,a:h,b:h,a:c,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:B,b:b,a:d,b:D,a:rh,b:rh,a:Bog";
var spikeless = "a:T,b:t,a:m,b:M,a:w,b:W,a:H,b:h,a:C,b:c,a:B,b:B,a:fl,b:fl,a:hl,b:hl,a:A1,b:A2,a:d,a:Bog,a:rh";
var spiked =    "a:T,b:t,a:m,b:M,a:w,b:W,a:H,b:h,a:C,b:c,a:B,b:B,a:fl,b:fl,a:hl,b:hl,a:A1,b:A2,a:d,a:Bog,a:Rh";
var faded = "a:T,b:t,a:m,b:M,a:w,b:W,a:H,b:h,a:c,b:C,a:B,b:B,a:fl,b:fl,a:hl,b:hl,a:A1,b:A2,a:d,a:Bog,a:rh";
var deep =  "a:T,b:t,a:m,b:M,a:w,b:W,a:H,b:h,a:c,b:C,a:B,b:B,a:fl,b:fl,a:hl,b:hl,a:A1,b:A2,a:D,a:Bog,a:rh";
var deepSpikedFemale = "a:T,b:t,a:m,b:M,a:w,b:W,a:H,b:h,a:c,b:C,a:B,b:B,a:fl,b:fl,a:hl,b:hl,a:A1,b:A2,a:d,b:D,a:Bog,b:Bog,a:rh,b:Rh";
var female = BioLogica.FEMALE,
    male   = BioLogica.MALE;
function drake(alleles, sex) {
  return new BioLogica.Organism(BioLogica.Species.Drake, alleles, sex);
}
function changes(org1, org2, xAlleles) {
  return BioLogica.Phenotype.numberOfChangesToReachPhenotype(org1, org2, BioLogica.Species.Drake, xAlleles);
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

    it("with a nose spike", function() {
      var org1 = drake(spikeless, male),
          org2 = drake(spiked, male);
      expect(changes(org1, org2)).toBe(1);
    });

    it("without a nose spike", function() {
      var org1 = drake(spiked, male),
          org2 = drake(spikeless, male);
      expect(changes(org1, org2)).toBe(1);
    });

    it("with a deep color", function() {
      var org1 = drake(faded, male),
          org2 = drake(deep, male);
      expect(changes(org1, org2)).toBe(1);
    });

    it("with a faded color", function() {
      var org1 = drake(deep, male),
          org2 = drake(faded, male);
      expect(changes(org1, org2)).toBe(1);
    });

    it("with recessive sex-linked traits", function() {
      var org1 = drake(spikeless, male),
          org2 = drake(deepSpikedFemale, female);
      expect(changes(org1, org2, "b:d,b:Bog,b:rh")).toBe(3);
    });

    it("with dominant sex-linked traits", function() {
      var org1 = drake(spikeless, male),
          org2 = drake(deepSpikedFemale, female);
      // switching to female accomplishes the necessary trait changes
      expect(changes(org1, org2, "b:D,b:Bog,b:Rh")).toBe(1);
      expect(changes(org2, org1, "b:D,b:Bog,b:Rh")).toBe(1);
    });
  });
});
