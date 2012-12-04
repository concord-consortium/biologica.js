BioLogica.Species = BioLogica.Species || {}

BioLogica.Species.GGDrake =

  name: "GGDrake"

  chromosomeNames: ['1', '2', 'XY']

  chromosomeGeneMap:
    '1': ['t','m','w', 'h']
    '2': ['c', 'g', 'a', 's']
    'XY': ['d', 'f']

  chromosomesLength:
    '1': 100000000
    '2': 100000000
    'XY': 70000000

  geneList:
    tail:
      alleles: ['T', 'Tk', 't']
      start: 10000000
      length: 10584
    metalic:
      alleles: ['M', 'm']
      start: 20000000
      length: 259610
    wings:
      alleles: ['W', 'w']
      start: 70000000
      length: 9094
    horns:
      alleles: ['H', 'h']
      start: 85000000
      length: 19421
    color:
      alleles: ['C', 'c']
      start: 15000000
      length: 64572
    green:
      alleles: ['G', 'g']
      start: 25000000
      length: 17596
    armor:
      alleles: ['A', 'a']
      start: 80000000
      length: 122234
    spikes:
      alleles: ['S', 's']
      start: 90000000
      length: 6371
    dilute:
      alleles: ['D', 'd']
      start: 20000000
      length: 152673
    firebreathing:
      alleles: ['F', 'f']
      start: 60000000
      length: 1000

  alleleLabelMap:
      'T': 'Long tail'
      'Tk': 'Kinked tail'
      't': 'Short tail'
      'M': 'Metallic'
      'm': 'Nonmetallic'
      'W': 'Wings'
      'w': 'No wings'
      'H': 'No horns'
      'h': 'Horns'
      'C': 'Colored'
      'c': 'Colorless'
      'A': 'No armor'
      'a': 'Armor'
      'S': 'Spikes wide'
      's': 'Spikes narrow'
      'G': 'Green'
      'g': 'Purple'
      'D': 'Full color'
      'd': 'Dilute color'
      'F': 'No fire breathing'
      'f': 'Fire breathing'
      'Y' : 'Y'
      '' : ''

  traitRules:
    "tail":
      "Long tail": [["T", "T"], ["T", "Tk"], ["T", "t"]]
      "Kinked tail": [["Tk", "Tk"], ["Tk", "t"]],
      "Short tail": [["t", "t"]]

    "wings":
      "Wings": [["W", "W"], ["W", "w"]]
      "No wings": [["w", "w"]]

    "horns":
      "Reverse horns": [["H", "H"], ["H", "h"]]
      "Forward horns": [["h", "h"]]

    "armor":
      "No armor": [["A", "A"], ["A", "a"]]
      "Armor": [["a", "a"]]

    "spikes":
      "Wide spikes": [["S", "S"]]
      "Medium spikes": [["S", "s"]]
      "Narrow spikes": [["s", "s"]]

    "fire breathing":
      "No fire breathing": [["F"]]
      "Fire breathing": [["f", "f"], ["f", "Y"]]

    "color":
      "Shiny green":    [["C", "G", "M", "D"]]
      "Shiny blue":     [["C", "G", "M", "d", "d"], ["C", "G", "M", "d", "Y"]]
      "Green":          [["C", "G", "m", "m", "D"]]
      "Blue":           [["C", "G", "m", "m", "d", "d"], ["C", "G", "m", "m", "d", "Y"]]
      "Shiny purple":   [["C", "g", "g", "M", "D"]]
      "Shiny red":      [["C", "g", "g", "M", "d", "d"], ["C", "g", "g", "M", "d", "Y"]]
      "Purple":         [["C", "g", "g", "m", "m", "D"]]
      "Red":            [["C", "g", "g", "m", "m", "d", "d"], ["C", "g", "g", "m", "m", "d", "Y"]]
      "Albino":         [["c", "c"]]

  ###
    GGDrakes are pieced together by sprites
  ###
  getImageName: (org) ->

  ###
    GGDrakes have no lethal characteristics
  ###
  makeAlive: (org) ->
