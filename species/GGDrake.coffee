BioLogica.Species = BioLogica.Species || {}

BioLogica.Species.GGDrake =

  name: "GGDrake"

  chromosomeNames: ['1', '2', 'XY']

  chromosomeGeneMap:
    '1': ['t','m','w', 'h']
    '2': ['c', 'b', 'a', 's']
    'XY': ['d', 'fb']

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
    black:
      alleles: ['B', 'b']
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
      alleles: ['D', 'd', 'dl']
      start: 20000000
      length: 152673
    firebreathing:
      alleles: ['Fb', 'fb']
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
      'B': 'Black'
      'b': 'Brown'
      'D': 'Full color'
      'd': 'Dilute color'
      'dl': 'dl'
      'Rh': 'Nose spike'
      'rh': 'No nose spike'
      'Fb': 'No fire breathing'
      'fb': 'Fire breathing'
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
      "No fire breathing": [["Fb"]]
      "Fire breathing": [["fb", "fb"], ["fb", "Y"]]

    "color":
      "Gray":     [["M"]]
      "Green":    [["m","m"]]
      ###
      "Frost":    [["c","c"]]
      "Steel":    [["C", "M", "B", "D"]]
      "Copper":   [["C", "M", "b", "b", "D"]]
      "Silver":   [["C", "M", "B", "d", "d"], ["C", "M", "B", "d", "dl"], ["C", "M", "B", "dl", "dl"]
                   ["C", "M", "B", "d", "Y"], ["C", "M", "B", "dl", "Y"]]
      "Gold":     [["C", "M", "b", "b", "d", "d"], ["C", "M", "b", "b", "d", "dl"], ["C", "M", "b", "b", "dl", "dl"]
                   ["C", "M", "b", "b", "d", "Y"], ["C", "M", "b", "b", "dl", "Y"]]
      "Charcoal": [["C", "m", "m", "B", "D"]]
      "Lava":     [["C", "m", "m", "b", "b", "D"]]
      "Ash":      [["C", "m", "m", "B", "d", "d"], ["C", "m", "m", "B", "d", "dl"], ["C", "m", "m", "B", "dl", "dl"]
                   ["C", "m", "m", "B", "d", "Y"], ["C", "m", "m", "B", "dl", "Y"]]
      "Sand":     [["C", "m", "m", "b", "b", "d", "d"], ["C", "m", "m", "b", "b", "d", "dl"]
                   ["C", "m", "m", "b", "b", "dl", "dl"], ["C", "m", "m", "b", "b", "d", "Y"]
                   ["C", "m", "m", "b", "b", "dl", "Y"]]
      ###

  ###
    GGDrakes are pieced together by sprites
  ###
  getImageName: (org) ->

  ###
    GGDrakes have no lethal characteristics
  ###
  makeAlive: (org) ->
