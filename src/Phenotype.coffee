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