class BioLogica.Organism

  constructor: (@species, @sex, @alleles) ->
    @genetics = new BioLogica.Genetics(@species, @sex, @alleles)

  getGenotype: ->
    @genetics.genotype

  ###
    For a given trait (a species-level property), returns this organism's
    characteristic. E.g. getCharacteristic("color") may return "green",
    getCharacteristic("horns") may return "no horns".
  ###
  getCharacteristic: (trait) ->
    return @genetics.characteristics[trait]

  performMeiosis: (crossover) ->
