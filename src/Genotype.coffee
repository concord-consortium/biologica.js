###
  The constructor should be passed a genotypeHash, of the form below, and this
  will be copied to the @chromosomes property.

  genotypeHash =
    {
      1: {
            a: ["Tk", "M", "w"]
            b: ["t", "m", "W"]
         }
      2: { ... }
      XY: { ... }
    }
###

class BioLogica.Genotype

  constructor: (genotypeHash, sex) ->
    # if male, remove the contents XY.b chromosome. NB: this may not be best strategy
    genotypeHash.XY?.b = [] if sex is BioLogica.MALE

    # copy genotypeHash into @chromosomes
    @chromosomes = {}
    @allAlleles = []
    for own chromosome, sides of genotypeHash
      @chromosomes[chromosome] = {}
      for own side, alleles of sides
        @chromosomes[chromosome][side] = alleles[..]
        @allAlleles = @allAlleles.concat alleles[..]

  containsAlleles: (alleles) ->
    allAllelesCopy = @allAlleles[..]
    (return false unless allAllelesCopy.removeObj(allele)) for allele in alleles
    true
