class BioLogica.Organism

  constructor: (@species, @sex, @alleles) ->
    @genetics = new BioLogica.Genetics(@species, @alleles)

    ###
      For a given trait (a species-level property), returns this organism's
      characteristic. E.g. getCharacteristic("color") may return "green",
      getCharacteristic("horns") may return "no horns".
    ###
    getCharacteristic: (trait) ->

    performMeiosis: (crossover) ->
