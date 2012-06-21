class BioLogica.Genotype

  constructor: (sex, genotypeHash) ->
    # if male, remove the contents XY.b chromosome. NB: this may not be best strategy
    genotypeHash.XY?.b = [] if sex is BioLogica.MALE

    # copy genotypeHash into @chromosomes
    @chromosomes = {}
    for own chromosome, sides of genotypeHash
      @chromosomes[chromosome] = {}
      for own side, alleles of sides
        @chromosomes[chromosome][side] = alleles[..]

  containsAlleles: (alleles) ->
