BioLogica.Species = {};

BioLogica.Species.Drake = {

  name: "Drake",

  allAlleles: [
    ['T', 'Tk', 't'],
    ['M', 'm'],
    ['W', 'w'],
    ['H', 'h'],
    ['C', 'c'],
    ['Fl', 'fl'],
    ['Hl', 'hl'],
    ['A1', 'A2', 'a'],
    ['B', 'b'],
    ['D', 'd', 'dl'],
    ['Rh', 'rh']
  ],

  allelesToChromosomeMap: {t: '1',tk: '1',m: '1',mt: '1',w: '1',
                           h: '2',c: '2',fl: '2',hl: '2',a: '2', a1: '2', a2: '2',
                           b: 'X',d: 'X',dl: 'X',rh: 'X'},

  alleleLabelMap : {
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
    'Y' : 'Y',
      '' : ''
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
      "No nose spike": [["rh", "rh"]]
    },
    "wings": {
      "Wings": [["W", "W"], ["W", "w"]],
      "No wings": [["w", "w"]]
    },
    "color": {
      "Steel":    [["M", "M", "B", "B", "D", "D"], ["M", "m", "B", "B", "D", "D"],
                   ["M", "M", "B", "b", "D", "D"], ["M", "M", "B", "B", "D", "d"],
                   ["M", "m", "B", "b", "D", "D"], ["M", "m", "B", "B", "D", "d"],
                   ["M", "M", "B", "b", "D", "d"], ["M", "m", "B", "b", "D", "d"]],
      "Copper":   [["M", "M", "b", "b", "D", "D"], ["M", "m", "b", "b", "D", "D"],
                   ["M", "M", "b", "b", "D", "d"], ["M", "m", "b", "b", "D", "d"]],
      "Argent":   [["M", "M", "B", "B", "d", "d"], ["M", "m", "B", "B", "d", "d"],
                   ["M", "M", "B", "b", "d", "d"], ["M", "m", "B", "b", "d", "d"]],
      "Gold":     [["M", "M", "b", "b", "d", "d"], ["M", "m", "b", "b", "d", "d"]],
      "Charcoal": [["m", "m", "B", "B", "D", "D"], ["m", "m", "B", "b", "D", "D"],
                   ["m", "m", "B", "B", "D", "d"], ["m", "m", "B", "b", "D", "d"]],
      "Earth":    [["m", "m", "b", "b", "D", "D"], ["m", "m", "b", "b", "D", "d"]],
      "Dust":     [["m", "m", "B", "B", "d", "d"], ["m", "m", "B", "b", "d", "d"]],
      "Sand":     [["m", "m", "b", "b", "d", "d"]]
    }
  }
}