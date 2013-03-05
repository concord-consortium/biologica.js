BioLogica.Species = BioLogica.Species || {}

BioLogica.Species.GGTournamentDrake =

  name: 'GGTournamentDrake'

  chromosomeNames: ['1', '2', 'XY']

  chromosomeGeneMap:
    '1': ['T3', 'M2', 'W2', 'A2']
    '2': ['H2', 'B2', 'G2', 'S2']
    'XY': ['D2', 'N2', 'F2']

  chromosomesLength:
    '1': 100000000
    '2': 100000000
    'XY': 70000000

  geneList:
    tail:
      alleles: ['T1', 'T2', 'T3', 'T4']
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
      alleles: ['A1', 'A2']
      start: 80000000
      length: 122234
    horns:
      alleles: ['H1', 'H2', 'H3']
      start: 15000000
      length: 19421
    backfin:
      alleles: ['B1', 'B2']
      start: 45000000
      length: 64572
    green:
      alleles: ['G1', 'G2']
      start: 55000000
      length: 17596
    spikes:
      alleles: ['S1', 'S2']
      start: 90000000
      length: 6371
    dilute:
      alleles: ['D1', 'D2']
      start: 20000000
      length: 152673
    neckpattern:
      alleles: ['N1', 'N2']
      start: 40000000
      length: 14003
    firebreathing:
      alleles: ['F1', 'F2']
      start: 60000000
      length: 1000

  alleleLabelMap:
      'T1': 'Long tail'
      'T2': 'Kinked tail'
      'T3': 'Short tail'
      'T4': 'Fat tail'
      'M1': 'Metallic'
      'M2': 'Nonmetallic'
      'W1': 'Wings'
      'W2': 'No wings'
      'H1': 'No horns'
      'H2': 'Horns'
      'H3': 'Upward horns'
      'B1': 'Small fin'
      'B2': 'Large fin'
      'A1': 'No armor'
      'A2': 'Armor'
      'S1': 'Spikes wide'
      'S2': 'Spikes narrow'
      'G1': 'Green'
      'G2': 'Purple'
      'D1': 'Full color'
      'D2': 'Dilute color'
      'F1': 'No fire breathing'
      'F2': 'Fire breathing'
      'N1': 'Spotted neck'
      'N2': 'Striped neck'
      'Y' : 'Y'
      '' : ''

  traitRules:
    'tail':
      'Long tail': [['T1', 'T1'], ['T1', 'T2'], ['T1', 'T3'],['T1','T4']]
      'Kinked tail': [['T2', 'T2'], ['T2', 'T3'],['T2','T4']],
      'Short tail': [['T3', 'T3'],['T3','T4']]
      'Fat tail': [['T4','T4']]

    'wings':
      'Wings': [['W1', 'W1'], ['W1', 'W2']]
      'No wings': [['W2', 'W2']]

    'horns':
      'Reverse horns': [['H1', 'H1'], ['H1', 'H2'],['H1','H3']]
      'Forward horns': [['H2', 'H2'],['H2','H3']]
      'Upward horns': [['H3', 'H3']]

    'armor':
      'No armor': [['A1', 'A1'], ['A1', 'A2']]
      'Armor': [['A2', 'A2']]

    'spikes':
      'Wide spikes': [['S1', 'S1']]
      'Medium spikes': [['S1', 'S2']]
      'Narrow spikes': [['S2', 'S2']]

    'fire breathing':
      'No fire breathing': [['F1']]
      'Fire breathing': [['F2', 'F2'], ['F2', 'Y']]

    'fin':
      'Small fin':  [['B1','B1']]
      'Medium fin': [['B1','B2']]
      'Large fin':  [['B2','B2']]

    'neckpattern':
      'Spotted neck': [['N1','N1'],['N1','N2'],['N1','Y']]
      'Striped neck': [['N2','N2'],['N2','Y']]

    'color':
      'Green':             [['G1', 'D1']]
      'Blue':              [['G1', 'D2', 'D2'], ['G1', 'D2', 'Y']]
      'Purple':            [['G2', 'G2', 'D1']]
      'Red':               [['G2', 'G2', 'D2', 'D2'], ['G2', 'G2', 'D2', 'Y']]

    'metallic':
      'Metallic':       [['M1']]
      'Nonmetallic':    [['M2','M2']]

  ###
    GGDrakes are pieced together by sprites
  ###
  getImageName: (org) ->

  ###
    GGDrakes have no lethal characteristics
  ###
  makeAlive: (org) ->
