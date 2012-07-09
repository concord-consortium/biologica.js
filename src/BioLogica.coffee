window.BioLogica ?= {}

###
  Breed two parents together. By default crossover will be used during meiosis
###
BioLogica.breed = (mother, father, crossover) ->
  gamete1 = mother.createGametes 1, crossover
  gamete2 = father.createGametes 1, crossover

  BioLogica.Organism.createFromGametes(mother.species, gamete1, gamete2)