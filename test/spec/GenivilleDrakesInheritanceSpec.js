var female = BioLogica.FEMALE,
    male   = BioLogica.MALE;

describe("For a GenivilleDrake, the characteristic", function() {

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

    [ female,    "a:A,b:A",       "armor",        "Five armor"    ],
    [ female,    "a:A,b:a",       "armor",        "Three armor"   ],
    [ female,    "a:a,b:a",       "armor",        "No armor"      ],

    [ female,    "a:Rh",          "nose spike",   "Nose spike"    ],
    [ female,    "a:rh,b:rh",     "nose spike",   "No nose spike" ],
    [ male,      "a:Rh",          "nose spike",   "Nose spike"    ],
    [ male,      "a:rh",          "nose spike",   "No nose spike" ],

    [ female,    "a:c,b:c",                      "color",      "Frost"    ],
    [ female,    "a:C,a:M,b:M,a:B,a:D",          "color",      "Steel"    ],
    [ female,    "a:C,b:c,a:M,b:m,a:B,a:D,b:d",  "color",      "Steel"    ],
    [ female,    "a:C,b:c,a:M,b:m,a:B,a:D,b:dl", "color",      "Steel"    ],
    [ female,    "a:C,a:M,b:M,a:b,b:b,a:D",      "color",      "Copper"   ],
    [ male,      "a:C,a:M,b:M,a:b,b:b,a:D",      "color",      "Copper"   ],
    [ female,    "a:C,a:M,b:M,a:B,a:d,b:d",      "color",      "Silver"   ],
    [ female,    "a:C,a:M,b:M,a:B,a:dl,b:d",     "color",      "Silver"   ],
    [ male,      "a:C,a:M,b:M,a:B,a:d",          "color",      "Silver"   ],
    [ female,    "a:C,a:M,b:m,a:b,b:b,a:d,b:d",  "color",      "Gold"     ],
    [ female,    "a:C,a:M,b:m,a:b,b:b,a:d,b:dl", "color",      "Gold"     ],
    [ male,      "a:C,a:M,b:m,a:b,b:b,a:d",      "color",      "Gold"     ],
    [ female,    "a:C,a:m,b:m,a:B,a:D",          "color",      "Charcoal" ],
    [ female,    "a:C,a:m,b:m,a:b,b:b,a:D",      "color",      "Lava"    ],
    [ male,      "a:C,a:m,b:m,a:b,b:b,a:D",      "color",      "Lava"    ],
    [ female,    "a:C,a:m,b:m,a:B,a:d,b:d",      "color",      "Ash"     ],
    [ male,      "a:C,a:m,b:m,a:B,a:d",          "color",      "Ash"     ],
    [ female,    "a:C,a:m,b:m,a:b,b:b,a:d,b:d",  "color",      "Sand"     ],
    [ male,      "a:C,a:m,b:m,a:b,b:b,a:d",      "color",      "Sand"     ],
    [ male,      "a:c,b:c",                      "color",      "Frost"     ],

    [ male,      "a:bog",         "health",   "Bog breath"  ],
    [ male,      "a:Bog",         "health",   "Healthy"     ],
    [ female,    "a:bog,b:bog",   "health",   "Bog breath"  ],
    [ female,    "a:Bog,b:bog",   "health",   "Healthy"     ],
    [ female,    "a:bog,b:Bog",   "health",   "Healthy"     ],
    [ female,    "a:Bog,b:Bog",   "health",   "Healthy"     ],

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
    testCharacteristic(desc, test);
  }

});

function testCharacteristic(desc, test) {
  it (desc, function() {
    expect([test[0], test[1], BioLogica.Species.GenivilleDrake]).toHaveCharacteristic(test[2], test[3]);
  });
}

describe("The traits", function() {

  it ("of an fully-specified GenivilleDrake should be exactly as defined", function() {
    var org = new BioLogica.Organism(BioLogica.Species.GenivilleDrake,
                              "a:t,b:Tk,a:m,b:M,a:w,b:w,a:H,b:H,a:C,b:c,a:Fl,b:fl,a:hl,b:hl,a:a,b:A,a:B,b:B,a:dl,b:d,a:rh,b:Rh",
                              female);
    expect(org).toHaveCharacteristic("tail", "Kinked tail");
    expect(org).toHaveCharacteristic("color", "Silver");
    expect(org).toHaveCharacteristic("wings", "No wings");
    expect(org).toHaveCharacteristic("horns", "Hornless");
    expect(org).toHaveCharacteristic("forelimbs", "Forelimbs");
    expect(org).toHaveCharacteristic("hindlimbs", "No hindlimbs");
    expect(org).toHaveCharacteristic("armor", "Three armor");
    expect(org).toHaveCharacteristic("nose spike", "Nose spike");

    org = new BioLogica.Organism(BioLogica.Species.GenivilleDrake,
                              "a:t,b:t,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:fl,a:Hl,b:hl,a:a,b:a,a:B,a:d,a:rh",
                              male);
    expect(org).toHaveCharacteristic("tail", "Short tail");
    expect(org).toHaveCharacteristic("color", "Ash");
    expect(org).toHaveCharacteristic("wings", "Wings");
    expect(org).toHaveCharacteristic("horns", "Horns");
    expect(org).toHaveCharacteristic("forelimbs", "No forelimbs");
    expect(org).toHaveCharacteristic("hindlimbs", "Hindlimbs");
    expect(org).toHaveCharacteristic("armor", "No armor");
    expect(org).toHaveCharacteristic("nose spike", "No nose spike");
  });
});

describe("The image name of an appropriate GenivilleDrake", function() {
  it ("should be ar_f_noWing_fore_a3_kink_noHorn_rostral_healthy.png", function() {
    var org = new BioLogica.Organism(BioLogica.Species.GenivilleDrake,
                "a:t,b:Tk,a:m,b:M,a:w,b:w,a:H,b:H,a:C,b:c,a:Fl,b:fl,a:hl,b:hl,a:a,b:A,a:B,b:B,a:dl,b:d,a:rh,b:Rh,a:Bog",
                female);
    expect(org.getImageName()).toBe("ar_f_noWing_fore_a3_kink_noHorn_rostral_healthy.png");
  });

  it ("should be du_m_wing_hind_a5_short_horn_noRostral_healthy.png", function() {
    var org = new BioLogica.Organism(BioLogica.Species.GenivilleDrake,
                "a:t,b:t,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:fl,a:Hl,b:hl,a:A,b:A,a:B,a:d,a:rh,a:Bog",
                male);
    expect(org.getImageName()).toBe("du_m_wing_hind_a5_short_horn_noRostral_healthy.png");
  });

  it ("should be sa_f_wing_allLimb_a0_flair_horn_noRostral_healthy.png", function() {
    var org = new BioLogica.Organism(BioLogica.Species.GenivilleDrake,
                "a:t,b:T,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:dl,a:rh,b:rh,a:Bog",
                female);
    expect(org.getImageName()).toBe("sa_f_wing_allLimb_a0_flair_horn_noRostral_healthy.png");
  });

  it ("should be sa_f_wing_allLimb_a0_flair_horn_noRostral_bogbreath.png", function() {
    var org = new BioLogica.Organism(BioLogica.Species.GenivilleDrake,
                "a:t,b:T,a:m,b:m,a:W,b:w,a:h,b:h,a:C,b:c,a:fl,b:Fl,a:Hl,b:hl,a:a,b:a,a:b,b:b,a:d,b:dl,a:rh,b:rh,a:bog,b:bog",
                female);
    expect(org.getImageName()).toBe("sa_f_wing_allLimb_a0_flair_horn_noRostral_bogbreath.png");
  });
});
