class BioLogica.Phenotype

  constructor: (genetics) ->
    @characteristics = {}
    @allCharacteristics = []
    for own trait, possibleCharacteristics of genetics.species.traitRules
      for own possibleCharacteristic, possibleAlleles of possibleCharacteristics
        for alleles in possibleAlleles
          if genetics.genotype.containsAlleles(alleles)
            @characteristics[trait] = possibleCharacteristic
            @allCharacteristics.push possibleCharacteristic
            break
        break if @characteristics[trait]


###
    Returns the number of separate changes, including allele changes and sex changes,
    required to match the phenotype of the 'testOrganism' to that of the 'targetOrganism'.
###
BioLogica.Phenotype.numberOfChangesToReachPhenotype = (testOrganism, targetOrganism, species) ->
  testOrganism = BioLogica.Organism.ensureValidOrganism(testOrganism, species)
  targetOrganism = BioLogica.Organism.ensureValidOrganism(targetOrganism, species)
  requiredChangeCount = BioLogica.Phenotype.numberOfAlleleChangesToReachPhenotype(testOrganism.phenotype.characteristics, targetOrganism.phenotype.characteristics, testOrganism.genetics.genotype.allAlleles, testOrganism.species.traitRules)
  if testOrganism.sex != targetOrganism.sex
    ++requiredChangeCount
  requiredChangeCount

###
    Returns the number of separate allele changes required to make the phenotype of
    the organism characterized by 'testCharacterstics' match that of the organism
    characterized by 'targetCharacteristics'. Adapted from:
    @see https://github.com/concord-consortium/Geniverse-SproutCore/blob/master/frameworks/geniverse/controllers/match.js
###
BioLogica.Phenotype.numberOfAlleleChangesToReachPhenotype = (testCharacteristics, targetCharacteristics, testAlleles, traitRules) ->
  alleles = testAlleles
  moves = 0
  for trait of traitRules
    if traitRules.hasOwnProperty(trait)
      if testCharacteristics[trait] != targetCharacteristics[trait]
        # first we have to work out what alleles the original drake has that correspond to
        # their non-matching trait
        possibleTraitAlleles = BioLogica.Genetics.collectAllAllelesForTrait(trait, traitRules)
        characteristicAlleles = []
        i = 0
        ii = alleles.length
        while i < ii
          if possibleTraitAlleles.indexOf(alleles[i]) >= 0
            characteristicAlleles.push alleles[i]
          i++
        # now work out the smallest number of steps to get from there to the desired characteristic
        possibleSolutions = traitRules[trait][targetCharacteristics[trait]]
        shortestPathLength = Infinity
        j = 0
        jj = possibleSolutions.length
        while j < jj
          solution = possibleSolutions[i].slice()
          pathLength = 0
          k = 0
          kk = characteristicAlleles.length
          while k < kk
            if solution.indexOf(characteristicAlleles[k]) == -1
              pathLength++
            else
              solution.splice solution.indexOf(characteristicAlleles[k]), 1
              # already matched this one, can't match it again
            k++
          shortestPathLength = if pathLength < shortestPathLength then pathLength else shortestPathLength
          j++
        moves += shortestPathLength
  moves