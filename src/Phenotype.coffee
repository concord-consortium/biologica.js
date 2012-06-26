class BioLogica.Phenotype

  constructor: (genetics) ->
    @characteristics = {}
    for own trait, possibleCharacteristics of genetics.species.traitRules
      for own possibleCharacteristic, possibleAlleles of possibleCharacteristics
        for alleles in possibleAlleles
          if genetics.genotype.containsAlleles(alleles)
            @characteristics[trait] = possibleCharacteristic
            break
        break if @characteristics[trait]