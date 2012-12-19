var species = BioLogica.Species.GGDrake,
    female = BioLogica.FEMALE,
    male   = BioLogica.MALE;

describe("For a GGDrake, the characteristic", function() {

  var phenotypeTests = [
  //   Sex      Alleles          Trait         Characteristic   //
    [ female,    "a:W1",             "wings",           "Wings"             ],
    [ female,    "a:W1,b:W1",        "wings",           "Wings"             ],
    [ female,    "a:W1,b:W2",        "wings",           "Wings"             ],
    [ female,    "a:W2,b:W2",        "wings",           "No wings"          ],

    [ female,    "a:T1",             "tail",            "Long tail"         ],
    [ female,    "a:T1,b:T2",        "tail",            "Long tail"         ],
    [ female,    "a:T1,b:T3",        "tail",            "Long tail"         ],
    [ female,    "a:T2,b:T2",        "tail",            "Kinked tail"       ],
    [ female,    "a:T2,b:T3",        "tail",            "Kinked tail"       ],
    [ female,    "a:T3,b:T3",        "tail",            "Short tail"        ],

    [ female,    "a:H1",             "horns",           "Reverse horns"     ],
    [ female,    "a:H1,b:H2",        "horns",           "Reverse horns"     ],
    [ female,    "a:H2,b:H2",        "horns",           "Forward horns"     ],

    [ female,    "a:F1",             "fire breathing",  "No fire breathing" ],
    [ female,    "a:F2,b:F1",        "fire breathing",  "No fire breathing" ],
    [ female,    "a:F2,b:F2",        "fire breathing",  "Fire breathing"    ],

    [ female,    "a:S1,b:S1",        "spikes",          "Wide spikes"       ],
    [ female,    "a:S1,b:S2",        "spikes",          "Medium spikes"     ],
    [ female,    "a:S2,b:S2",        "spikes",          "Narrow spikes"     ],

    [ female,    "a:A1",             "armor",           "No armor"          ],
    [ female,    "a:A2,b:A2",        "armor",           "Armor"             ],

    [ female,    "a:C1,a:G1,a:M1,a:D1",                 "color",  "Shiny green"  ],
    [ male,      "a:C1,a:G1,a:G2,a:M1,b:M2,a:D1",       "color",  "Shiny green"  ],
    [ female,    "a:C1,a:G1,a:M1,a:D2,b:D2",            "color",  "Shiny blue"   ],
    [ male,      "a:C1,a:G1,a:M1,a:D2",                 "color",  "Shiny blue"   ],
    [ female,    "a:C1,a:G1,a:M2,b:M2,a:D1",            "color",  "Green"        ],
    [ female,    "a:C1,a:G1,a:M2,b:M2,a:D2,b:D2",       "color",  "Blue"         ],
    [ female,    "a:C1,a:G2,b:G2,a:M1,a:D1",            "color",  "Shiny purple" ],
    [ male,      "a:C1,a:G2,b:G2,a:G2,a:M1,b:M2,a:D1",  "color",  "Shiny purple" ],
    [ female,    "a:C1,a:G2,b:G2,a:M1,a:D2,b:D2",       "color",  "Shiny red"    ],
    [ male,      "a:C1,a:G2,b:G2,a:M1,a:D2",            "color",  "Shiny red"    ],
    [ female,    "a:C1,a:G2,b:G2,a:M2,b:M2,a:D1",       "color",  "Purple"       ],
    [ female,    "a:C1,a:G2,b:G2,a:M2,b:M2,a:D2,b:D2",  "color",  "Red"          ],
    [ female,    "a:C2,b:C2",                           "color",  "Albino"       ]

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


