BioLogica.Species = BioLogica.Species || {}

BioLogica.Species.Dragon =

  name: 'Dragon'

  chromosomeNames: ['1', '2', 'XY']

  chromosomeGeneMap:
    '1': ['h','s']
    '2': ['w','l','t']
    'XY': ['p','f','a','b']

  chromosomesLength:
    '1': 100000000
    '2': 100000000
    'XY': 70000000

  geneList:
    horns:
      alleles: ['H', 'h', 'HU']
      start: 5000000
      length: 5333
    scales:
      alleles: ['S', 's']
      start: 7500000
      length: 7667
    wings:
      alleles: ['W', 'w', 'wd']
      start: 2769231
      length: 25128
    legs:
      alleles: ['L', 'l']
      start: 4615385
      length: 19230
    tail:
      alleles: ['T', 't', 'ta']
      start: 6153846
      length: 10256
    plates:
      alleles: ['P', 'p']
      start: 2333333
      length: 6000
    fire:
      alleles: ['F','f','fb']
      start: 3033333
      length: 26600
    color1:
      alleles: ['A', 'a', 'aw']
      start: 4200000
      length: 26133
    color2:
      alleles: ['B', 'b']
      start: 6020000
      length: 32200

  alleleLabelMap:
    'H': 'Horns'
    'h': 'No horns'
    'HU': 'Unicorn'
    'S': 'No scales'
    's': 'Scales'
    'W': 'No wings'
    'w': 'Wings'
    'wd': 'Double wings'
    'L': 'Legs'
    'l': 'No legs'
    'T': 'Fancy tail'
    't': 'Plain tail'
    'ta': 'Arrow tail'
    'P': 'Plates'
    'p': 'No plates'
    'F': 'No fire'
    'f': 'Fire'
    'fb': 'Blue fire'
    'A': 'Color A'
    'a': 'Color a'
    'aw': 'Color aw'
    'B': 'Color B'
    'b': 'Color b'
    'Y' : 'Y'
    '' : ''

  traitRules:
    'horns':
      'Horns':    [['H','H'],['H','h']]
      'No Horns': [['h','h']]
      'Unicorn':  [['HU','H'],['HU','h'],['HU','HU']]

    'scales':
      'Scales':    [['s', 's']]
      'No Scales': [['S','S'],['S','s']]

    'wings':
      'Double Wings': [['wd','wd'],['wd','w']]
      'Wings':        [['w','w'],['W','wd']]
      'No Wings':     [['W','W'],['W','w']]

    'legs':
      'Four Legs': [['L','L']]
      'Two Legs':  [['L','l']]
      'No Legs':   [['l','l']]

    'tail':
      'Fancy Tail': [['T','T'],['T','t'],['T','ta']]
      'Plain Tail': [['t','t'],['t','ta']]
      'Arrow Tail': [['ta','ta']]

    'fire':
      'No Fire':  [['F','F'],['F','f'],['F','fb'],['F','Y']]
      'Fire':      [['f','f'],['f','fb'],['f','Y']]
      'Blue Fire': [['fb','fb'],['fb','Y']]

    'color':
      'Green':  [['A','B','Y'],['A','b','Y']]
      'Yellow': [['a','B','Y'],['a','b','Y']]
      'Red':    [['A','A','B','B'],['A','a','B','B']]
      'Purple': [['a','a','B','B']]
      'Brown':  [['A','A','B','b'],['A','A','b','b'],['A','a','B','b'],['A','a','b','b']]
      'Blue':   [['a','a','B','b'],['a','a','b','b']]
      'Albino': BioLogica.combinations([['aw'],['A','a','aw'],['B','b'],['B','b']]).concat BioLogica.combinations([['aw'],['B','b'],['Y']])

    'plates':
      'Big Plates':    [['P', 'P']]
      'Little Plates': [['P', 'p'],['P','Y']]
      'No Plates':     [['p','p'],['p','Y']]

    'liveliness':
      'Alive': [['B','B'],['B','b'],['B','Y']]
      'Dead':  [['b', 'b'], ['b', 'Y']]

  ###
    Uses an external engine's sprite sheets to generate the images.
  ###
  getImageName: (org) ->
    undefined

  ###
    Makes sure the organism has at least one big B
  ###
  makeAlive: (org) ->
    if org.getCharacteristic('liveliness') is 'Dead'
      if org.sex is BioLogica.MALE
        chromosome = org.getGenotype().chromosomes['XY']['x']
      else
        # find the chromosome with a little b
        chromosome1 = org.getGenotype().chromosomes['XY']['x1']
        chromosome2 = org.getGenotype().chromosomes['XY']['x2']

        if 'b' in chromosome1.alleles
          if 'b' in chromosome2.alleles
            chromosome = if ExtMath.flip() then chromosome1 else chromosome2
          else
            chromosome = chromosome1
        else
          chromosome = chromosome2

      org.getGenotype().replaceAllele chromosome, 'b', 'B'
      org.resetPhenotype()
