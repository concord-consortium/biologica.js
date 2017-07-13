class BioLogica.Organism

  constructor: (@species, alleles, @sex) ->
    @alleles = if typeof alleles is "string" then @preProcessAlleleString alleles else alleles
    @genetics = new BioLogica.Genetics(@species, @alleles, @sex)
    @sex ?= @genetics.genotype.sex
    @resetPhenotype()

  getGenotype: ->
    @genetics.genotype

  resetPhenotype: ->
    @phenotype = new BioLogica.Phenotype(@genetics)

  ###
    For a given trait (a species-level property), returns this organism's
    characteristic. E.g. getCharacteristic("color") may return "green",
    getCharacteristic("horns") may return "no horns".
  ###
  getCharacteristic: (trait) ->
    return @phenotype.characteristics[trait]

  ###
    Returns an array containing all the org's characteristics, e.g. [Wings, No horns, ...]
  ###
  getAllCharacteristics: ->
    return @phenotype.allCharacteristics

  getImageName: ->
    @species.getImageName(this)

  getAlleleString: ->
    @genetics.getAlleleString()

  getAlleleStringForTrait: (trait) ->
    @genetics.getAlleleStringForTrait(trait)

  ###
    Creates n gametes, using crossover during meiosis by default .
    If only one gamete is requested, that gamete will be returned. Otherwise an
    array of gametes will be returned
  ###
  createGametes: (n, performCrossover) ->
    performCrossover ?= true     # default
    gametes = []
    gametes = gametes.concat @genetics.performMeiosis(performCrossover).cells for i in [0...Math.floor(n/4)]
    gametes = gametes.concat @genetics.performMeiosis(performCrossover).cells[0...(n%4)]
    return if gametes.length is 1 then gametes[0] else gametes

  # returns gametes in sets of 4, and will always return a complete set.
  # So the number of sets for arg N will be the smallest Y where 4*Y >= N
  # ie, arg 3 -> [{}], arg 6 -> [{},{}], arg 8 -> [{},{}], arg 9 -> [{},{},{}]
  createGametesWithCrossInfo: (n, performCrossover) ->
    performCrossover ?= true     # default
    gametes = []
    gametes = gametes.concat @genetics.performMeiosis(performCrossover) for i in [0...Math.floor(n/4)]
    gametes = gametes.concat @genetics.performMeiosis(performCrossover) if n % 4 != 0
    return gametes

  preProcessAlleleString: (str) ->
    return str.replace(/,+$/, "")   # rm trailing comma

  toString: ->
    sex = if @sex == BioLogica.FEMALE then "female" else "male"
    alleles = @genetics.genotype.allAlleles

    return  "Organism: {sex: #{sex}, authored alleles: #{@alleles}, alleles: #{alleles}"

BioLogica.Organism.createOrganism = (species, alleles, sex) ->
  alleles ?= ""
  sex ?= if ExtMath.flip() then BioLogica.FEMALE else BioLogica.MALE
  return new BioLogica.Organism(species, alleles, sex)

BioLogica.Organism.createLiveOrganism = (species, alleles, sex) ->
  alleles ?= ""
  sex ?= if ExtMath.flip() then BioLogica.FEMALE else BioLogica.MALE
  org = new BioLogica.Organism(species, alleles, sex)
  org.species.makeAlive org
  return org

BioLogica.Organism.createFromGametes = (species, motherGamete, fatherGamete) ->
  for i, chromosome of fatherGamete
    chromosome.side = "b" if chromosome.side is "a"

  for i, chromosome of motherGamete
    chromosome.side = "a" if chromosome.side is "b"

  if fatherGamete["XY"].side is "y"
    motherGamete["XY"].side = "x"
  else
    motherGamete["XY"].side = "x1"
    fatherGamete["XY"].side = "x2"


  genotypeHash = {}
  for own chromoName, chromatidA of motherGamete
    chromatidB = fatherGamete[chromoName]
    genotypeHash[chromoName] = {}
    genotypeHash[chromoName][chromatidA.side] = chromatidA.alleles
    genotypeHash[chromoName][chromatidB.side] = chromatidB.alleles

  return new BioLogica.Organism(species, genotypeHash)

BioLogica.Organism. ensureValidOrganism = (orgOrDef, species) ->
  if orgOrDef.getAlleleString
    return orgOrDef
  new (BioLogica.Organism)(species, orgOrDef.alleleString, orgOrDef.sex)
