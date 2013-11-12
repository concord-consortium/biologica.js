var female = BioLogica.FEMALE,
    male   = BioLogica.MALE;

describe("For a GGLizard, the characteristic", function() {

  var phenotypeTests = [
  //   Sex        Alleles             Trait         Characteristic   //
    [ female,    "a:R1",             "ridges",        "Squared ridges"       ],
    [ female,    "a:R1,b:R2",        "ridges",        "Squared ridges"       ],
    [ female,    "a:R1,b:R3",        "ridges",        "Squared ridges"       ],
    [ female,    "a:R2,b:R2",        "ridges",        "Rounded ridges"       ],
    [ female,    "a:R2,b:R3",        "ridges",        "Rounded ridges"       ],
    [ female,    "a:R3,b:R3",        "ridges",        "Pointy ridges"        ],

    [ female,    "a:M1",             "metallic",      "Metallic"             ],
    [ female,    "a:M2,b:M2",        "metallic",      "Nonmetallic"          ],

    [ female,    "a:W1",             "wings",         "Wings"                ],
    [ female,    "a:W1,b:W1",        "wings",         "Wings"                ],
    [ female,    "a:W1,b:W2",        "wings",         "Wings"                ],
    [ female,    "a:W2,b:W2",        "wings",         "No wings"             ],

    [ female,    "a:E1",             "ear flaps",     "No ear flaps"         ],
    [ female,    "a:E2,b:E2",        "ear flaps",     "Ear flaps"            ],

    [ female,    "a:Q1",             "quill",         "Quill 1"              ],
    [ female,    "a:Q1,b:Q2",        "quill",         "Quill 1"              ],
    [ female,    "a:Q2,b:Q2",        "quill",         "Quill 2"              ],

    [ female,    "a:L1,b:L1",        "legs",          "Long legs"            ],
    [ female,    "a:L1,b:L2",        "legs",          "Medium legs"          ],
    [ female,    "a:L2,b:L2",        "legs",          "Short legs"           ],

    [ male,      "a:V1",             "venomous",      "Non venomous"         ],
    [ male,      "a:V2",             "venomous",      "Venomous"             ],
    [ female,    "a:V2,b:V1",        "venomous",      "Non venomous"         ],
    [ female,    "a:V2,b:V2",        "venomous",      "Venomous"             ],

    [ female,    "a:G1,a:D1",             "color",    "Green"                ],
    [ female,    "a:G1,a:D2,b:D2",        "color",    "Blue"                 ],
    [ female,    "a:G2,b:G2,a:D1",        "color",    "Purple"               ],
    [ female,    "a:G2,b:G2,a:D2,b:D2",   "color",    "Red"                  ]

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
    expect([test[0], test[1], BioLogica.Species.GGLizard]).toHaveCharacteristic(test[2], test[3]);
  });
}


