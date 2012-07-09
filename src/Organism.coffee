class BioLogica.Organism

  constructor: (@species, @alleles, @sex) ->
    @genetics = new BioLogica.Genetics(@species, @alleles, @sex)
    @sex ?= if @genetics.genotype.chromosomes.XY?.y? then BioLogica.MALE else BioLogica.FEMALE
    @phenotype = new BioLogica.Phenotype(@genetics)

  getGenotype: ->
    @genetics.genotype

  ###
    For a given trait (a species-level property), returns this organism's
    characteristic. E.g. getCharacteristic("color") may return "green",
    getCharacteristic("horns") may return "no horns".
  ###
  getCharacteristic: (trait) ->
    return @phenotype.characteristics[trait]

  getImageName: ->
    @species.getImageName(this)

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

  toString: ->
    sex = if @sex == BioLogica.FEMALE then "female" else "male"
    alleles = @genetics.genotype.allAlleles

    return  "Organism: {sex: #{sex}, authored alleles: #{@alleles}, alleles: #{alleles}"
