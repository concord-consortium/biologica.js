BioLogica.Species = BioLogica.Species || {}

BioLogica.Species.GGLizard =

  name: 'GGLizard'

  chromosomeNames: ['1', '2', 'XY']

  chromosomeGeneMap:
    '1': ['R3', 'M2', 'W2', 'E2']
    '2': ['B2', 'C2', 'G2', 'L2']
    'XY': ['D2', 'V2']

  chromosomesLength:
    '1': 100000000
    '2': 100000000
    'XY': 70000000

  geneList:
    ridges:
      alleles: ['R1', 'R2', 'R3']
      start: 10000000
      length: 10584
    metallic:
      alleles: ['M1', 'M2']
      start: 20000000
      length: 259610
    wings:
      alleles: ['W1', 'W2']
      start: 70000000
      length: 9094
    armor:
      alleles: ['E1', 'E2']
      start: 80000000
      length: 122234
    barb:
      alleles: ['B1', 'B2']
      start: 15000000
      length: 19421
    color:
      alleles: ['C1', 'C2']
      start: 45000000
      length: 64572
    green:
      alleles: ['G1', 'G2']
      start: 55000000
      length: 17596
    legs:
      alleles: ['L1', 'L2']
      start: 90000000
      length: 6371
    dilute:
      alleles: ['D1', 'D2']
      start: 20000000
      length: 152673
    venomous:
      alleles: ['V1', 'V2']
      start: 60000000
      length: 1000

  alleleLabelMap:
      'R1': 'Squared ridges'
      'R2': 'Rounded ridges'
      'R3': 'Pointy ridges'
      'M1': 'Metallic'
      'M2': 'Nonmetallic'
      'W1': 'Curly Wings'
      'W2': 'Flat wings'
      'B1': 'Barb 1'
      'B2': 'Barb 2'
      'C1': 'Colored'
      'C2': 'Colorless'
      'E1': 'No ear flaps'
      'E2': 'Ear flaps'
      'L1': 'Long legs'
      'L2': 'Short legs'
      'G1': 'Green'
      'G2': 'Purple'
      'D1': 'Full color'
      'D2': 'Dilute color'
      'V1': 'Not venomous'
      'V2': 'Venomous'
      'Y' : 'Y'
      '' : ''

  traitRules:
    'ridges':
      'Squared ridges': [['R1', 'R1'], ['R1', 'R2'], ['R1', 'R3']]
      'Rounded ridges': [['R2', 'R2'], ['R2', 'R3']],
      'Pointy ridges':  [['R3', 'R3']]

    'wings':
      'Curly wings': [['W1']]
      'Flat wings': [['W2', 'W2']]

    'barb':
      'Barb 1': [['B1']]
      'Barb 2': [['B2', 'B2']]

    'ear flaps':
      'No ear flaps': [['E1']]
      'Ear flaps': [['E2', 'E2']]

    'legs':
      'Long legs': [['L1', 'L1']]
      'Medium legs': [['L1', 'L2']]
      'Short legs': [['L2', 'L2']]

    'venomous':
      'Non venomous': [['V1']]
      'Venomous': [['V2', 'V2'], ['V2', 'Y']]

    'color':
      'Green':             [['G1', 'D1']]
      'Blue':              [['G1', 'D2', 'D2'], ['G1', 'D2', 'Y']]
      'Purple':            [['G2', 'G2', 'D1']]
      'Red':               [['G2', 'G2', 'D2', 'D2'], ['G2', 'G2', 'D2', 'Y']]

    'metallic':
      'Metallic':       [['M1']]
      'Nonmetallic':    [['M2','M2']]

  ###
    GGLizards are pieced together by sprites
  ###
  getImageName: (org) ->

  ###
    GGLizards have no lethal characteristics
  ###
  makeAlive: (org) ->
