describe("The characteristic", function() {

  var phenotypeTests = [
  //   Sex               Alleles       Trait       Characteristic //
    [BioLogica.FEMALE,  "a:W",        "wings",      "Wings"],
    [BioLogica.FEMALE,  "a:W,b:W",    "wings",      "Wings"],
    [BioLogica.FEMALE,  "a:W,b:w",    "wings",      "Wings"],
    [BioLogica.FEMALE,  "a:w,b:w",    "wings",      "No wings"],

    [BioLogica.FEMALE,  "a:T",        "tail",       "Long tail"],
    [BioLogica.FEMALE,  "a:T,b:Tk",   "tail",       "Long tail"],
    [BioLogica.FEMALE,  "a:T,b:t",    "tail",       "Long tail"],
    [BioLogica.FEMALE,  "a:Tk,b:Tk",  "tail",       "Kinked tail"],
    [BioLogica.FEMALE,  "a:Tk,b:t",   "tail",       "Kinked tail"],
    [BioLogica.FEMALE,  "a:t,b:t",    "tail",       "Short tail"],

    [BioLogica.FEMALE,  "a:H",        "horns",      "Hornless"],
    [BioLogica.FEMALE,  "a:H,b:h",    "horns",      "Hornless"],
    [BioLogica.FEMALE,  "a:h,b:h",    "horns",      "Horns"],

    [BioLogica.FEMALE,  "a:Fl",       "forelimbs",  "Forelimbs"],
    [BioLogica.FEMALE,  "a:fl,b:fl",  "forelimbs",  "No forelimbs"],

    [BioLogica.FEMALE,  "a:Hl",       "hindlimbs",  "Hindlimbs"],
    [BioLogica.FEMALE,  "a:hl,b:hl",  "hindlimbs",  "No hindlimbs"],

    [BioLogica.FEMALE,  "a:A1,b:A1",  "armor",      "Five armor"],
    [BioLogica.FEMALE,  "a:A1,b:A2",  "armor",      "Five armor"],
    [BioLogica.FEMALE,  "a:A1,b:a",   "armor",      "Three armor"],
    [BioLogica.FEMALE,  "a:A2,b:A2",  "armor",      "Three armor"],
    [BioLogica.FEMALE,  "a:A2,b:a",   "armor",      "One armor"],
    [BioLogica.FEMALE,  "a:a,b:a",    "armor",      "No armor"],

    [BioLogica.FEMALE,  "a:Rh",       "nose spike", "Nose spike"],
    [BioLogica.FEMALE,  "a:rh,rh",    "nose spike", "No nose spike"],
    [BioLogica.MALE,    "a:Rh",       "nose spike", "Nose spike"],
    [BioLogica.MALE,    "a:rh",       "nose spike", "No nose spike"],

    [BioLogica.FEMALE,  "a:c,b:c",                      "color",      "Frost"],
    [BioLogica.FEMALE,  "a:C,a:M,b:M,a:B,a:D",          "color",      "Steel"],
    [BioLogica.FEMALE,  "a:C,b:c,a:M,b:m,a:B,a:D,b:d",  "color",      "Steel"],
    [BioLogica.FEMALE,  "a:C,a:M,b:M,a:b,b:b,a:D",      "color",      "Copper"],
    [BioLogica.MALE,    "a:C,a:M,b:M,a:b,a:D",          "color",      "Copper"],
    [BioLogica.FEMALE,  "a:C,a:M,b:M,a:B,a:d,b:d",      "color",      "Argent"],
    [BioLogica.MALE,    "a:C,a:M,b:M,a:B,a:d",          "color",      "Argent"],
    [BioLogica.FEMALE,  "a:C,a:M,b:m,a:b,b:b,a:d,b:d",  "color",      "Gold"],
    [BioLogica.MALE,    "a:C,a:M,b:m,a:b,a:d",          "color",      "Gold"],
    [BioLogica.FEMALE,  "a:C,a:m,b:m,a:B,a:D",          "color",      "Charcoal"],
    [BioLogica.FEMALE,  "a:C,a:m,b:m,a:b,b:b,a:D",      "color",      "Earth"],
    [BioLogica.MALE,    "a:C,a:m,b:m,a:b,a:D",          "color",      "Earth"],
    [BioLogica.FEMALE,  "a:C,a:m,b:m,a:B,a:d,b:d",      "color",      "Dust"],
    [BioLogica.MALE,    "a:C,a:m,b:m,a:B,a:d",          "color",      "Dust"],
    [BioLogica.FEMALE,  "a:C,a:m,b:m,a:b,b:b,a:d,b:d",  "color",      "Sand"],
    [BioLogica.MALE,    "a:C,a:m,b:m,a:b,a:d",          "color",      "Sand"],

    [BioLogica.FEMALE,  "a:M,b:M,a:dl,b:dl,a:A1,b:A1",  "liveliness", "Dead"],
    [BioLogica.FEMALE,  "a:M,b:M,a:d,b:dl,a:A1",        "liveliness", "Dead"],
    [BioLogica.FEMALE,  "a:M,b:m,a:D,b:dl,a:A2",        "liveliness", "Dead"],
    [BioLogica.Male,    "a:dl",                         "liveliness", "Dead"],
    [BioLogica.FEMALE,  "a:M,b:M,a:D,b:D,a:a,b:a",      "liveliness", "Alive"],
    [BioLogica.Male,    "a:D",                          "liveliness", "Alive"],
    [BioLogica.Male,    "a:d",                          "liveliness", "Alive"]
  ];

  for (var i=0,ii=phenotypeTests.length; i<ii; i++ ) {
    var test = phenotypeTests[i],
        desc = "for "+test[2]+" of a " + (test[0] === BioLogica.FEMALE ? "female" : "male") +
               " with "+test[1]+" should be: "+test[3].toLowerCase();
    it (desc, function() {
      expect([test[0], test[1]]).toHaveCharacteristic(test[2], test[3]);
    });
  }


});
