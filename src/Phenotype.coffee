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
    Returns true if the specified set of solutions includes the specified allele (or "Y").
###
solutionsContainsAllele = (solutions, allele) ->
  for solution in solutions
    return true if solution.indexOf(allele) >= 0
  false

###
    Returns the number of separate changes, including allele changes and sex changes,
    required to match the phenotype of the 'testOrganism' to that of the 'targetOrganism'.
    xAlleles is an allele string that represents the alleles to be added in the case of
    a male test organism being compared to a female target. If not specified, they will
    be randomly generated, which can lead to inconsistent results.
###
BioLogica.Phenotype.numberOfChangesToReachPhenotype = (testOrganism, targetOrganism, species, xAlleles) ->
  testOrganism = BioLogica.Organism.ensureValidOrganism(testOrganism, species)
  targetOrganism = BioLogica.Organism.ensureValidOrganism(targetOrganism, species)

  requiredChanges = 0
  if testOrganism.sex != targetOrganism.sex
    # +1 for the sex change
    ++requiredChanges
    testAlleles = testOrganism.getAlleleString()
    # add second X chromosome alleles if changing from male to female
    if testOrganism.sex == BioLogica.MALE && xAlleles?
      testAlleles += "," + xAlleles
    # make a new test organism with the correct sex
    testOrganism = new BioLogica.Organism(species, testAlleles, targetOrganism.sex)

  # add the number of allele changes required
  requiredChanges += BioLogica.Phenotype.numberOfAlleleChangesToReachPhenotype(testOrganism.phenotype.characteristics, targetOrganism.phenotype.characteristics, testOrganism.genetics.genotype.allAlleles, testOrganism.species, testOrganism.sex)

###
    Returns the number of separate allele changes required to make the phenotype of
    the organism characterized by 'testCharacterstics' match that of the organism
    characterized by 'targetCharacteristics'. Adapted from:
    @see https://github.com/concord-consortium/Geniverse-SproutCore/blob/master/frameworks/geniverse/controllers/match.js
###
BioLogica.Phenotype.numberOfAlleleChangesToReachPhenotype = (testCharacteristics, targetCharacteristics, testAlleles, species, sex) ->
  traitRules = species.traitRules
  alleles = testAlleles
  moves = 0
  for trait of traitRules
    if traitRules.hasOwnProperty(trait)
      if testCharacteristics[trait] != targetCharacteristics[trait]
        # first we have to work out what alleles the original drake has that correspond to the non-matching trait
        possibleTraitGenes = BioLogica.Genetics.collectAllGenesForCharacteristic(trait, targetCharacteristics[trait], species)
        # and the possible combinations of alleles that would match the trait
        possibleSolutions = traitRules[trait][targetCharacteristics[trait]]

        characteristicAlleles = []
        i = 0
        ii = alleles.length
        while i < ii
          for gene in possibleTraitGenes
            if BioLogica.Genetics.getGeneOfAllele(species, alleles[i]) is gene
              characteristicAlleles.push alleles[i]
              continue
          i++
        # add "Y" for males with sex-linked genes
        characteristicAlleles.push("Y") if sex == BioLogica.MALE && solutionsContainsAllele(possibleSolutions, "Y")

        # now work out the smallest number of steps to get from there to the desired characteristic
        shortestPathLength = Infinity
        j = 0
        jj = possibleSolutions.length
        while j < jj
          solution = possibleSolutions[j].slice()
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
