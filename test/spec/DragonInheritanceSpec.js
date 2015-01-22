var female = BioLogica.FEMALE,
    male   = BioLogica.MALE;

describe("For a Dragon, the characteristic", function() {

  var phenotypeTests = [
    //   Sex      Alleles             Trait             Characteristic     //
    [ female,    "a:H,b:H",           "horns",          "Horns"            ],
    [ female,    "a:H,b:h",           "horns",          "Horns"            ],
    [ female,    "a:h,b:h",           "horns",          "No Horns"         ],
    [ female,    "a:HU",              "horns",          "Unicorn"          ],
    [ female,    "a:HU,b:H",          "horns",          "Unicorn"          ],
    [ female,    "a:HU,b:h",          "horns",          "Unicorn"          ],

    [ female,    "a:S,b:S",           "scales",         "No Scales"        ],
    [ female,    "a:S,b:s",           "scales",         "No Scales"        ],
    [ female,    "a:s,b:s",           "scales",         "Scales"           ],

    [ female,    "a:wd,b:wd",         "wings",          "Double Wings"     ],
    [ female,    "a:w,b:wd",          "wings",          "Double Wings"     ],
    [ female,    "a:W,b:wd",          "wings",          "Wings"            ],
    [ female,    "a:w,b:w",           "wings",          "Wings"            ],
    [ female,    "a:W,b:w",           "wings",          "No Wings"         ],
    [ female,    "a:W,b:W",           "wings",          "No Wings"         ],

    [ female,    "a:L,b:L",           "legs",           "Four Legs"        ],
    [ female,    "a:L,b:l",           "legs",           "Two Legs"         ],
    [ female,    "a:l,b:l",           "legs",           "No Legs"          ],

    [ female,    "a:T,b:T",           "tail",           "Fancy Tail"       ],
    [ female,    "a:T,b:t",           "tail",           "Fancy Tail"       ],
    [ female,    "a:T,b:ta",          "tail",           "Fancy Tail"       ],
    [ female,    "a:t,b:t",           "tail",           "Plain Tail"       ],
    [ female,    "a:t,b:ta",          "tail",           "Plain Tail"       ],
    [ female,    "a:ta,b:ta",         "tail",           "Arrow Tail"       ],

    // These are all traits that are on the X chromosome, so we have to test male and female //

    [ female,    "a:P,b:P",           "plates",         "Big Plates"       ],
    [ female,    "a:P,b:p",           "plates",         "Little Plates"    ],
    [ female,    "a:p,b:p",           "plates",         "No Plates"        ],
    [   male,    "a:P",               "plates",         "Little Plates"    ],
    [   male,    "a:p",               "plates",         "No Plates"        ],

    [ female,    "a:F,b:F",           "fire",           "No Fire"          ],
    [ female,    "a:f,b:F",           "fire",           "No Fire"          ],
    [ female,    "a:fb,b:F",          "fire",           "No Fire"          ],
    [ female,    "a:f,b:f",           "fire",           "Fire"             ],
    [ female,    "a:f,b:fb",          "fire",           "Fire"             ],
    [ female,    "a:fb,b:fb",         "fire",           "Blue Fire"        ],
    [   male,    "a:F,",              "fire",           "No Fire"          ],
    [   male,    "a:f",               "fire",           "Fire"             ],
    [   male,    "a:fb",              "fire",           "Blue Fire"        ],

    [ female,    "a:A,b:A,a:B,b:B",   "color",          "Red"              ],
    [ female,    "a:A,b:a,a:B,b:B",   "color",          "Red"              ],
    [ female,    "a:a,b:a,a:B,b:B",   "color",          "Purple"           ],
    [ female,    "a:A,b:A,a:B,b:b",   "color",          "Brown"            ],
    [ female,    "a:A,b:a,a:B,b:b",   "color",          "Brown"            ],
    [ female,    "a:a,b:a,a:B,b:b",   "color",          "Blue"             ],
    [ female,    "a:A,b:A,a:b,b:b",   "color",          "Brown"            ],
    [ female,    "a:A,b:a,a:b,b:b",   "color",          "Brown"            ],
    [ female,    "a:a,b:a,a:b,b:b",   "color",          "Blue"             ],

    [   male,    "a:A,a:B",           "color",          "Green"            ],
    [   male,    "a:A,a:b",           "color",          "Green"            ],
    [   male,    "a:a,a:B",           "color",          "Yellow"           ],
    [   male,    "a:a,a:b",           "color",          "Yellow"           ],

    [ female,    "a:aw,b:A,a:B,b:B",  "color",          "Albino"           ],
    [ female,    "a:aw,b:a,a:B,b:B",  "color",          "Albino"           ],
    [ female,    "a:aw,b:aw,a:B,b:B", "color",          "Albino"           ],
    [ female,    "a:aw,b:A,a:B,b:b",  "color",          "Albino"           ],
    [ female,    "a:aw,b:a,a:B,b:b",  "color",          "Albino"           ],
    [ female,    "a:aw,b:aw,a:B,b:b", "color",          "Albino"           ],
    [ female,    "a:aw,b:A,a:b,b:b",  "color",          "Albino"           ],
    [ female,    "a:aw,b:a,a:b,b:b",  "color",          "Albino"           ],
    [ female,    "a:aw,b:aw,a:b,b:b", "color",          "Albino"           ],

    [   male,    "a:aw,a:B",          "color",          "Albino"           ],
    [   male,    "a:aw,a:b",          "color",          "Albino"           ],

    [ female,    "a:B,b:B",           "liveliness",     "Alive"            ],
    [ female,    "a:B,b:b",           "liveliness",     "Alive"            ],
    [ female,    "a:b,b:b",           "liveliness",     "Dead"             ],
    [   male,    "a:B",               "liveliness",     "Alive"            ],
    [   male,    "a:b",               "liveliness",     "Dead"             ]
  ];

  for (var i=0,ii=phenotypeTests.length; i<ii; i++ ) {
    var test = phenotypeTests[i],
        desc = "for "+pad(test[2],11) +" of a " + pad((test[0] === female ? "female" : "male"),6) +
               " with "+pad(test[1],16)+" should be: "+pad(test[3].toLowerCase(), 13);
    testCharacteristic(desc, test);
  }

});

function pad(str, width, left) {
  var out = "";
  while ((out.length + str.length) < width) {
    out += " ";
  }
  if (left) { return out + str; }
  else { return str + out; }
}

function testCharacteristic(desc, test) {
  it (desc, function() {
    expect([test[0], test[1], BioLogica.Species.Dragon]).toHaveCharacteristic(test[2], test[3]);
  });
}


