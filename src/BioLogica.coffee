window.BioLogica ?= {}

BioLogica.breed = (mother, father) ->
  gamete1 = mother.genetics.createGametes 1
  gamete2 = father.genetics.createGametes 1

  for i, chromosome of gamete2
    chromosome.name = "b" if chromosome.name is "a"

  if gamete2["XY"].name is "x"
    gamete1["XY"].name = "x1"
    gamete2["XY"].name = "x2"

  genotypeHash = {}
  for own chromoName, chromatidA of gamete1
    chromatidB = gamete2[chromoName]
    genotypeHash[chromoName] = {}
    genotypeHash[chromoName][chromatidA.name] = chromatidA.alleles
    genotypeHash[chromoName][chromatidB.name] = chromatidB.alleles

  return new BioLogica.Organism(mother.species, genotypeHash)