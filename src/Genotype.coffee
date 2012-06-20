class BioLogica.Genotype

  constructor: (genotypeHash) ->
    # copy genotypeHash into @chromosomes
    @chromosomes = {}
    for own chromosome, sides of genotypeHash
      @chromosomes[chromosome] = {}
      for own side, alleles of sides
        @chromosomes[chromosome][side] = alleles[..]

  containsAlleles: (alleles) ->
