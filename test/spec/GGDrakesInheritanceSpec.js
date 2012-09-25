var species = BioLogica.Species.GGDrake,
    female = BioLogica.FEMALE,
    male   = BioLogica.MALE;

describe("For a GGDrake, the characteristic", function() {

  var phenotypeTests = [
  //   Sex      Alleles          Trait         Characteristic   //
    [ female,    "a:W",           "wings",           "Wings"             ],
    [ female,    "a:W,b:W",       "wings",           "Wings"             ],
    [ female,    "a:W,b:w",       "wings",           "Wings"             ],
    [ female,    "a:w,b:w",       "wings",           "No wings"          ],

    [ female,    "a:T",           "tail",            "Long tail"         ],
    [ female,    "a:T,b:Tk",      "tail",            "Long tail"         ],
    [ female,    "a:T,b:t",       "tail",            "Long tail"         ],
    [ female,    "a:Tk,b:Tk",     "tail",            "Kinked tail"       ],
    [ female,    "a:Tk,b:t",      "tail",            "Kinked tail"       ],
    [ female,    "a:t,b:t",       "tail",            "Short tail"        ],

    [ female,    "a:H",           "horns",           "Hornless"          ],
    [ female,    "a:H,b:h",       "horns",           "Hornless"          ],
    [ female,    "a:h,b:h",       "horns",           "Horns"             ],

    [ female,    "a:Fb",          "fire breathing",  "No fire breathing" ],
    [ female,    "a:fb,b:Fb",     "fire breathing",  "No fire breathing" ],
    [ female,    "a:fb,b:fb",     "fire breathing",  "Fire breathing"    ],

    [ female,    "a:S,b:S",       "spikes",          "Wide spikes"       ],
    [ female,    "a:S,b:s",       "spikes",          "Medium spikes"     ],
    [ female,    "a:s,b:s",       "spikes",          "Narrow spikes"     ],

    [ female,    "a:Fl",          "forelimbs",       "Short forelimbs"   ],
    [ female,    "a:fl,b:fl",     "forelimbs",       "Long forelimbs"    ],

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

    [ male,      "a:bog",         "metabolism",   "Bog breath"         ],
    [ male,      "a:Bog",         "metabolism",   "Normal metabolism"  ],
    [ female,    "a:bog,b:bog",   "metabolism",   "Bog breath"         ],
    [ female,    "a:Bog,b:bog",   "metabolism",   "Normal metabolism"  ],
    [ female,    "a:bog,b:Bog",   "metabolism",   "Normal metabolism"  ],
    [ female,    "a:Bog,b:Bog",   "metabolism",   "Normal metabolism"  ]
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
    expect([test[0], test[1], species]).toHaveCharacteristic(test[2], test[3]);
  });
}


