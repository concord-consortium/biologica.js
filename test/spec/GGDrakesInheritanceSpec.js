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

    [ female,    "a:H",           "horns",           "Reverse horns"     ],
    [ female,    "a:H,b:h",       "horns",           "Reverse horns"     ],
    [ female,    "a:h,b:h",       "horns",           "Forward horns"     ],

    [ female,    "a:F",           "fire breathing",  "No fire breathing" ],
    [ female,    "a:f,b:F",       "fire breathing",  "No fire breathing" ],
    [ female,    "a:f,b:f",       "fire breathing",  "Fire breathing"    ],

    [ female,    "a:S,b:S",       "spikes",          "Wide spikes"       ],
    [ female,    "a:S,b:s",       "spikes",          "Medium spikes"     ],
    [ female,    "a:s,b:s",       "spikes",          "Narrow spikes"     ],

    [ female,    "a:A",           "armor",           "No armor"          ],
    [ female,    "a:a,b:a",       "armor",           "Armor"             ],

    [ female,    "a:C,a:G,a:M,a:D",             "color",  "Shiny green"  ],
    [ male,      "a:C,a:G,a:g,a:M,b:m,a:D",     "color",  "Shiny green"  ],
    [ female,    "a:C,a:G,a:M,a:d,b:d",         "color",  "Shiny blue"   ],
    [ male,      "a:C,a:G,a:M,a:d",             "color",  "Shiny blue"   ],
    [ female,    "a:C,a:G,a:m,b:m,a:D",         "color",  "Green"        ],
    [ female,    "a:C,a:G,a:m,b:m,a:d,b:d",     "color",  "Blue"         ],
    [ female,    "a:C,a:g,b:g,a:M,a:D",         "color",  "Shiny purple" ],
    [ male,      "a:C,a:g,b:g,a:g,a:M,b:m,a:D", "color",  "Shiny purple" ],
    [ female,    "a:C,a:g,b:g,a:M,a:d,b:d",     "color",  "Shiny red"    ],
    [ male,      "a:C,a:g,b:g,a:M,a:d",         "color",  "Shiny red"    ],
    [ female,    "a:C,a:g,b:g,a:m,b:m,a:D",     "color",  "Purple"       ],
    [ female,    "a:C,a:g,b:g,a:m,b:m,a:d,b:d", "color",  "Red"          ],
    [ female,    "a:c,b:c",                     "color",  "Albino"       ]

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


