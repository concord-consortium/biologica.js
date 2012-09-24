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

  getImageName: ->
    @species.getImageName(this)

  getAlleleString: ->
    @genetics.getAlleleString()

  ###
    Creates n gametes, using crossover during meiosis by default .
    If only one gamete is requested, that gamete will be returned. Otherwise an
    array of gametes will be returned
  ###
  createGametes: (n, performCrossover) ->
    performCrossover ?= true     # default
    gametes = []
    gametes = gametes.concat @genetics.performMeiosis(performCrossover) for i in [0...Math.floor(n/4)]
    gametes = gametes.concat @genetics.performMeiosis(performCrossover)[0...(n%4)]
    return if gametes.length is 1 then gametes[0] else gametes

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

  if fatherGamete["XY"].side is "x"
    motherGamete["XY"].side = "x1"
    fatherGamete["XY"].side = "x2"

  genotypeHash = {}
  for own chromoName, chromatidA of motherGamete
    chromatidB = fatherGamete[chromoName]
    genotypeHash[chromoName] = {}
    genotypeHash[chromoName][chromatidA.side] = chromatidA.alleles
    genotypeHash[chromoName][chromatidB.side] = chromatidB.alleles

  return new BioLogica.Organism(species, genotypeHash)
