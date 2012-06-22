var female = BioLogica.FEMALE,
    male   = BioLogica.MALE;

describe("The characteristic", function() {

  var phenotypeTests = [
  //   Sex      Alleles          Trait         Characteristic   //
    [ female,    "a:W",           "wings",        "Wings"         ],
    [ female,    "a:W,b:W",       "wings",        "Wings"         ],
    [ female,    "a:W,b:w",       "wings",        "Wings"         ],
    [ female,    "a:w,b:w",       "wings",        "No wings"      ],

    [ female,    "a:T",           "tail",         "Long tail"     ],
    [ female,    "a:T,b:Tk",      "tail",         "Long tail"     ],
    [ female,    "a:T,b:t",       "tail",         "Long tail"     ],
    [ female,    "a:Tk,b:Tk",     "tail",         "Kinked tail"   ],
    [ female,    "a:Tk,b:t",      "tail",         "Kinked tail"   ],
    [ female,    "a:t,b:t",       "tail",         "Short tail"    ],

    [ female,    "a:H",           "horns",        "Hornless"      ],
    [ female,    "a:H,b:h",       "horns",        "Hornless"      ],
    [ female,    "a:h,b:h",       "horns",        "Horns"         ],

    [ female,    "a:Fl",          "forelimbs",    "Forelimbs"     ],
    [ female,    "a:fl,b:fl",     "forelimbs",    "No forelimbs"  ],

    [ female,    "a:Hl",          "hindlimbs",    "Hindlimbs"     ],
    [ female,    "a:hl,b:hl",     "hindlimbs",    "No hindlimbs"  ],

    [ female,    "a:A1,b:A1",     "armor",        "Five armor"    ],
    [ female,    "a:A1,b:A2",     "armor",        "Five armor"    ],
    [ female,    "a:A1,b:a",      "armor",        "Three armor"   ],
    [ female,    "a:A2,b:A2",     "armor",        "Three armor"   ],
    [ female,    "a:A2,b:a",      "armor",        "One armor"     ],
    [ female,    "a:a,b:a",       "armor",        "No armor"      ],

    [ female,    "a:Rh",          "nose spike",   "Nose spike"    ],
    [ female,    "a:rh,rh",       "nose spike",   "No nose spike" ],
    [ male,      "a:Rh",          "nose spike",   "Nose spike"    ],
    [ male,      "a:rh",          "nose spike",   "No nose spike" ],

    [ female,    "a:c,b:c",                      "color",      "Frost"    ],
    [ female,    "a:C,a:M,b:M,a:B,a:D",          "color",      "Steel"    ],
    [ female,    "a:C,b:c,a:M,b:m,a:B,a:D,b:d",  "color",      "Steel"    ],
    [ female,    "a:C,b:c,a:M,b:m,a:B,a:D,b:dl", "color",      "Steel"    ],
    [ female,    "a:C,a:M,b:M,a:b,b:b,a:D",      "color",      "Copper"   ],
    [ male,      "a:C,a:M,b:M,a:b,a:D",          "color",      "Copper"   ],
    [ female,    "a:C,a:M,b:M,a:B,a:d,b:d",      "color",      "Argent"   ],
    [ female,    "a:C,a:M,b:M,a:B,a:dl,b:d",     "color",      "Argent"   ],
    [ male,      "a:C,a:M,b:M,a:B,a:d",          "color",      "Argent"   ],
    [ female,    "a:C,a:M,b:m,a:b,b:b,a:d,b:d",  "color",      "Gold"     ],
    [ female,    "a:C,a:M,b:m,a:b,b:b,a:d,b:dl", "color",      "Gold"     ],
    [ male,      "a:C,a:M,b:m,a:b,a:d",          "color",      "Gold"     ],
    [ female,    "a:C,a:m,b:m,a:B,a:D",          "color",      "Charcoal" ],
    [ female,    "a:C,a:m,b:m,a:b,b:b,a:D",      "color",      "Earth"    ],
    [ male,      "a:C,a:m,b:m,a:b,a:D",          "color",      "Earth"    ],
    [ female,    "a:C,a:m,b:m,a:B,a:d,b:d",      "color",      "Dust"     ],
    [ male,      "a:C,a:m,b:m,a:B,a:d",          "color",      "Dust"     ],
    [ female,    "a:C,a:m,b:m,a:b,b:b,a:d,b:d",  "color",      "Sand"     ],
    [ male,      "a:C,a:m,b:m,a:b,a:d",          "color",      "Sand"     ],

    [ female,    "a:M,b:M,a:dl,b:dl,a:A1,b:A1",  "liveliness", "Dead"     ],
    [ male,      "a:dl",                         "liveliness", "Dead"     ],
    [ female,    "a:M,b:M,a:d,b:dl,a:A1",        "liveliness", "Alive"    ],
    [ female,    "a:M,b:m,a:D,b:dl,a:A2",        "liveliness", "Alive"    ],
    [ female,    "a:M,b:M,a:D,b:D,a:a,b:a",      "liveliness", "Alive"    ],
    [ male,      "a:D",                          "liveliness", "Alive"    ],
    [ male,      "a:d",                          "liveliness", "Alive"    ]
  ];

  for (var i=0,ii=phenotypeTests.length; i<ii; i++ ) {
    var test = phenotypeTests[i],
        desc = "for "+test[2]+" of a " + (test[0] === female ? "female" : "male") +
               " with "+test[1]+" should be: "+test[3].toLowerCase();
    it (desc, function() {
      expect([test[0], test[1]]).toHaveCharacteristic(test[2], test[3]);
    });
  }

});

describe("The traits", function() {
  it ("of an under-specified organism should be fully specified", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, female, ""),
        traits = ["wings", "tail", "horns", "forelimbs", "hindlimbs", "armor", "nose spike", "color", "liveliness"],
        allTraitsSpecified = true;

    for (var i=0, ii=traits.length; i<ii;i++){
      if (!org.getCharacteristic(traits[i])) {
        allTraitsSpecified = false;
        break;
      }
    }
    expect(allTraitsSpecified).toBe(true);
  });

  it ("of an fully-specified organism should be exactly as defined", function() {
    var org = new BioLogica.Organism(BioLogica.Species.Drake, female,
                              "a:t,b:Tk,a:m,b:M,a:w,b:w,a:H,b:H,a:C,b:c,a:Fl,b:fl,a:hl,b:hl,a:a,b:A2,a:B,b:B,a:dl,b:d,a:rh,b:Rh");
    expect(org).toHaveCharacteristic("tail", "Kinked tail");
    expect(org).toHaveCharacteristic("color", "Argent");
    expect(org).toHaveCharacteristic("wings", "No wings");
    expect(org).toHaveCharacteristic("horns", "Hornless");
    expect(org).toHaveCharacteristic("forelimbs", "Forelimbs");
    expect(org).toHaveCharacteristic("hindlimbs", "No hindlimbs");
    expect(org).toHaveCharacteristic("armor", "One armor");
    expect(org).toHaveCharacteristic("nose spike", "Nose spike");

    var org = new BioLogica.Organism(BioLogica.Species.Drake, male,
                              "a:t,b:t,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:fl,a:Hl,b:hl,a:A2,b:A2,a:B,a:d,a:rh");
    expect(org).toHaveCharacteristic("tail", "Short tail");
    expect(org).toHaveCharacteristic("color", "Dust");
    expect(org).toHaveCharacteristic("wings", "Wings");
    expect(org).toHaveCharacteristic("horns", "Horns");
    expect(org).toHaveCharacteristic("forelimbs", "No forelimbs");
    expect(org).toHaveCharacteristic("hindlimbs", "Hindlimbs");
    expect(org).toHaveCharacteristic("armor", "Three armor");
    expect(org).toHaveCharacteristic("nose spike", "No nose spike");

  });
})