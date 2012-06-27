class BioLogica.Chromosome

  constructor: (@name, @alleles) ->

  clone: (newName) ->
    new BioLogica.Chromosome(newName or @name, @alleles[..])