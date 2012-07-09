// Generated by CoffeeScript 1.3.3
(function() {
  var _ref;

  if ((_ref = window.BioLogica) == null) {
    window.BioLogica = {};
  }

  BioLogica.Species = {};

  BioLogica.Species.Drake = {
    name: "Drake",
    chromosomeNames: ['1', '2', 'XY'],
    chromosomeGeneMap: {
      '1': ['t', 'm', 'w'],
      '2': ['h', 'c', 'fl', 'hl', 'a'],
      'XY': ['b', 'd', 'rh']
    },
    chromosomesLength: {
      '1': 100000000,
      '2': 100000000,
      'XY': 70000000
    },
    geneList: {
      tail: {
        alleles: ['T', 'Tk', 't'],
        start: 10000000,
        length: 10584
      },
      metalic: {
        alleles: ['M', 'm'],
        start: 20000000,
        length: 259610
      },
      wings: {
        alleles: ['W', 'w'],
        start: 70000000,
        length: 9094
      },
      horns: {
        alleles: ['H', 'h'],
        start: 10000000,
        length: 19421
      },
      color: {
        alleles: ['C', 'c'],
        start: 50000000,
        length: 64572
      },
      forelimbs: {
        alleles: ['Fl', 'fl'],
        start: 80000000,
        length: 122234
      },
      hindlimbs: {
        alleles: ['Hl', 'hl'],
        start: 85000000,
        length: 6371
      },
      armor: {
        alleles: ['A1', 'A2', 'a'],
        start: 90000000,
        length: 425156
      },
      black: {
        alleles: ['B', 'b'],
        start: 20000000,
        length: 17596
      },
      dilute: {
        alleles: ['D', 'd', 'dl'],
        start: 40000000,
        length: 152673
      },
      nose: {
        alleles: ['Rh', 'rh'],
        start: 60000000,
        length: 2950
      }
    },
    alleleLabelMap: {
      'T': 'Long tail',
      'Tk': 'Kinked tail',
      't': 'Short tail',
      'M': 'Metallic',
      'm': 'Nonmetallic',
      'W': 'Wings',
      'w': 'No wings',
      'H': 'No horns',
      'h': 'Horns',
      'C': 'Colored',
      'c': 'Colorless',
      'Fl': 'Forelimbs',
      'fl': 'No forelimbs',
      'Hl': 'Hindlimbs',
      'hl': 'No hindlimbs',
      'A1': "'A1' armor",
      'A2': "'A2' armor",
      'a': "'a' armor",
      'B': 'Black',
      'b': 'Brown',
      'D': 'Full color',
      'd': 'Dilute color',
      'dl': 'dl',
      'Rh': 'Nose spike',
      'rh': 'No nose spike',
      'Y': 'Y',
      '': ''
    },
    traitRules: {
      "armor": {
        "Five armor": [["A1", "A1"], ["A1", "A2"]],
        "Three armor": [["A1", "a"], ["A2", "A2"]],
        "One armor": [["A2", "a"]],
        "No armor": [["a", "a"]]
      },
      "tail": {
        "Long tail": [["T", "T"], ["T", "Tk"], ["T", "t"]],
        "Kinked tail": [["Tk", "Tk"], ["Tk", "t"]],
        "Short tail": [["t", "t"]]
      },
      "forelimbs": {
        "Forelimbs": [["Fl", "Fl"], ["Fl", "fl"]],
        "No forelimbs": [["fl", "fl"]]
      },
      "hindlimbs": {
        "Hindlimbs": [["Hl", "Hl"], ["Hl", "hl"]],
        "No hindlimbs": [["hl", "hl"]]
      },
      "horns": {
        "Hornless": [["H", "H"], ["H", "h"]],
        "Horns": [["h", "h"]]
      },
      "nose spike": {
        "Nose spike": [["Rh", "Rh"], ["Rh", "rh"]],
        "No nose spike": [["rh", "rh"], ["rh"]]
      },
      "wings": {
        "Wings": [["W", "W"], ["W", "w"]],
        "No wings": [["w", "w"]]
      },
      "color": {
        "Steel": [["M", "M", "B", "B", "D", "D"], ["M", "m", "B", "B", "D", "D"], ["M", "M", "B", "b", "D", "D"], ["M", "M", "B", "B", "D", "d"], ["M", "m", "B", "b", "D", "D"], ["M", "m", "B", "B", "D", "d"], ["M", "M", "B", "b", "D", "d"], ["M", "m", "B", "b", "D", "d"]],
        "Copper": [["M", "M", "b", "b", "D", "D"], ["M", "m", "b", "b", "D", "D"], ["M", "M", "b", "b", "D", "d"], ["M", "m", "b", "b", "D", "d"]],
        "Argent": [["M", "M", "B", "B", "d", "d"], ["M", "m", "B", "B", "d", "d"], ["M", "M", "B", "b", "d", "d"], ["M", "m", "B", "b", "d", "d"]],
        "Gold": [["M", "M", "b", "b", "d", "d"], ["M", "m", "b", "b", "d", "d"]],
        "Charcoal": [["m", "m", "B", "B", "D", "D"], ["m", "m", "B", "b", "D", "D"], ["m", "m", "B", "B", "D", "d"], ["m", "m", "B", "b", "D", "d"]],
        "Earth": [["m", "m", "b", "b", "D", "D"], ["m", "m", "b", "b", "D", "d"]],
        "Dust": [["m", "m", "B", "B", "d", "d"], ["m", "m", "B", "b", "d", "d"]],
        "Sand": [["m", "m", "b", "b", "d", "d"]],
        "Steel": [["M", "M", "B", "D"], ["M", "m", "B", "D"]],
        "Copper": [["M", "M", "b", "D"], ["M", "m", "b", "D"]],
        "Argent": [["M", "M", "B", "d"], ["M", "m", "B", "d"]],
        "Gold": [["M", "M", "b", "d"], ["M", "m", "b", "d"]],
        "Charcoal": [["m", "m", "B", "D"], ["m", "m", "B", "D"]],
        "Earth": [["m", "m", "b", "D"]],
        "Dust": [["m", "m", "B", "d"]],
        "Sand": [["m", "m", "b", "d"], []]
      },
      "liveliness": {
        "Alive": [["D"], ["d"]],
        "Dead": [["dl", "dl"], ["dl"], []]
      }
    },
    /*
        Gets the image name based on the organism's characteristics.
        Requires the BioLogica.js library, and for org to be a BioLogica.js organism
    */

    getImageName: function(org) {
      var filename, limbs, trait;
      trait = function(trait) {
        return org.getCharacteristic(trait);
      };
      if (trait("liveliness") === "Dead") {
        return "dead-drake.png";
      }
      filename = "";
      filename += trait("color").toLowerCase().substring(0, 2) + "_";
      filename += org.sex === BioLogica.FEMALE ? "f_" : "m_";
      filename += trait("wings") === "Wings" ? "wing_" : "noWing_";
      limbs = "";
      if (trait("forelimbs") === "Forelimbs") {
        if (trait("hindlimbs") === "Hindlimbs") {
          limbs = "allLimb_";
        } else {
          limbs = "fore_";
        }
      } else if (trait("hindlimbs") === "Hindlimbs") {
        limbs = "hind_";
      } else {
        limbs = "noLimb_";
      }
      filename += limbs;
      filename += (function() {
        switch (trait("armor")) {
          case "Five armor":
            return "a5_";
          case "Three armor":
            return "a3_";
          case "One armor":
            return "a1_";
          default:
            return "a0_";
        }
      })();
      filename += (function() {
        switch (trait("tail")) {
          case "Long tail":
            return "flair_";
          case "Kinked tail":
            return "kink_";
          default:
            return "short_";
        }
      })();
      filename += trait("horns") === "Horns" ? "horn_" : "noHorn_";
      filename += trait("nose spike") === "Nose spike" ? "rostral_" : "noRostral_";
      filename += "healthy";
      return filename += ".png";
    }
  };

}).call(this);
