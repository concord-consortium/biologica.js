class BioLogica.Organism

  constructor: (@species, @alleles, @sex) ->
    @genetics = new BioLogica.Genetics(@species, @alleles, @sex)
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

  performMeiosis: (crossover) ->

  toString: ->
    sex = if @sex == BioLogica.FEMALE then "female" else "male"
    alleles = @genetics.genotype.allAlleles

    return  "Organism: {sex: #{sex}, authored alleles: #{@alleles}, alleles: #{alleles}"
