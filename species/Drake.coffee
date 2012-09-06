BioLogica.Species = {}

BioLogica.Species.Drake =

  name: "Drake"

  chromosomeNames: ['1', '2', 'XY']

  chromosomeGeneMap:
    '1': ['t','m','w', 'h']
    '2': ['c', 'b', 'fl', 'hl', 'a']
    'XY': ['d', 'rh']

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
      start: 50000000
      length: 64572
    black:
      alleles: ['B', 'b']
      start: 65000000
      length: 17596
    forelimbs:
      alleles: ['Fl', 'fl']
      start: 80000000
      length: 122234
    hindlimbs:
      alleles: ['Hl', 'hl']
      start: 85000000
      length: 6371
    armor:
      alleles: ['A1', 'A2', 'a']
      start: 90000000
      length: 425156
    dilute:
      alleles: ['D', 'd', 'dl']
      start: 20000000
      length: 152673
    nose:
      alleles: ['Rh', 'rh']
      start: 60000000
      length: 2950

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
      'Fl': 'Forelimbs'
      'fl': 'No forelimbs'
      'Hl': 'Hindlimbs'
      'hl': 'No hindlimbs'
      'A1': "'A1' armor"
      'A2': "'A2' armor"
      'a': "'a' armor"
      'B': 'Black'
      'b': 'Brown'
      'D': 'Full color'
      'd': 'Dilute color'
      'dl': 'dl'
      'Rh': 'Nose spike'
      'rh': 'No nose spike'
      'Y' : 'Y'
      '' : ''

  traitRules:
    "armor":
      "Five armor": [["A1", "A1"], ["A1", "A2"]]
      "Three armor": [["A1", "a"], ["A2", "A2"]]
      "One armor": [["A2", "a"]]
      "No armor": [["a", "a"]]

    "tail":
      "Long tail": [["T", "T"], ["T", "Tk"], ["T", "t"]]
      "Kinked tail": [["Tk", "Tk"], ["Tk", "t"]],
      "Short tail": [["t", "t"]]

    "forelimbs":
      "Forelimbs": [["Fl", "Fl"], ["Fl", "fl"]]
      "No forelimbs": [["fl", "fl"]]

    "hindlimbs":
      "Hindlimbs": [["Hl", "Hl"], ["Hl", "hl"]]
      "No hindlimbs": [["hl", "hl"]]

    "horns":
      "Hornless": [["H", "H"], ["H", "h"]]
      "Horns": [["h", "h"]]

    "nose spike":
      "Nose spike": [["Rh"]]
      "No nose spike": [["rh", "rh"], ["rh", "Y"]]

    "wings":
      "Wings": [["W", "W"], ["W", "w"]]
      "No wings": [["w", "w"]]

    "color":
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

    "liveliness":
      "Alive":    [["D"],["d"]]
      "Dead":     [["dl", "dl"], ["dl", "Y"]]

  ###
    Gets the image name based on the organism's characteristics.
    Requires the BioLogica.js library, and for org to be a BioLogica.js organism
  ###
  getImageName: (org) ->

    trait = (trait) ->
      return org.getCharacteristic trait

    return "dead-drake.png" if trait("liveliness") is "Dead"


    # [color]_[sex]_[wing]_[limbs]_[armor]_[tail]_[horn]_[rostralHorn]_[health].png
    filename = ""

# Changed some names for color phenotypes but image filenames still use old phynotypic names
    traitColor = trait("color")
    if traitColor is "Silver"
      traitColor = "Argent"
    else if traitColor is "Lava"
      traitColor = "Earth"
    else if traitColor is "Ash"
      traitColor = "Dust"

    filename += traitColor.toLowerCase().substring(0,2) + "_"

    filename += if org.sex is BioLogica.FEMALE then "f_" else "m_"

    filename += if trait("wings") is "Wings" then "wing_" else "noWing_"

    limbs = ""
    if trait("forelimbs") is "Forelimbs"
      if trait("hindlimbs") is "Hindlimbs"
        limbs = "allLimb_"
      else
        limbs = "fore_"
    else if trait("hindlimbs") is "Hindlimbs"
      limbs = "hind_"
    else
      limbs = "noLimb_"
    filename += limbs

    filename += switch trait("armor")
      when "Five armor" then "a5_"
      when "Three armor" then "a3_"
      when "One armor" then "a1_"
      else "a0_"

    filename += switch trait("tail")
      when "Long tail" then "flair_"
      when "Kinked tail" then "kink_"
      else "short_"

    filename += if trait("horns") is "Horns" then "horn_" else "noHorn_"

    filename += if trait("nose spike") is "Nose spike" then "rostral_" else "noRostral_"

    filename += "healthy"

    filename += ".png"

  ###

  ###
  makeAlive: (org) ->
    if org.getCharacteristic("liveliness") is "Dead"
      xChromoName = if org.sex is BioLogica.MALE then "x"
      else if ExtMath.flip() then "x1" else "x2"
      chromsome = org.getGenotype().chromosomes["XY"][xChromoName]

      replacementAllele = if ExtMath.flip() then "D" else "d"
      org.getGenotype().replaceAllele chromsome, "dl", replacementAllele
      org.resetPhenotype()