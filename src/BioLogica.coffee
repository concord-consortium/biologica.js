window.BioLogica ?= {}

BioLogica.breed = (mother, father, crossover) ->
  crossover ?= true     # default
  gamete1 = mother.genetics.createGametes 1, crossover
  gamete2 = father.genetics.createGametes 1, crossover

  for i, chromosome of gamete2
    chromosome.side = "b" if chromosome.side is "a"

  if gamete2["XY"].side is "x"
    gamete1["XY"].side = "x1"
    gamete2["XY"].side = "x2"

  genotypeHash = {}
  for own chromoName, chromatidA of gamete1
    chromatidB = gamete2[chromoName]
    genotypeHash[chromoName] = {}
    genotypeHash[chromoName][chromatidA.side] = chromatidA.alleles
    genotypeHash[chromoName][chromatidB.side] = chromatidB.alleles

  return new BioLogica.Organism(mother.species, genotypeHash)