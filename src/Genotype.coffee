###
  The constructor should be passed a genotypeHash, of the form below, and this
  will be copied to the @chromosomes property.

  genotypeHash =
    {
      1: {
            a: ["Tk", "M", "w"]
            b: ["t", "m", "W"]
         }
      2: { a:..., b:... }
      XY: { x1:..., x2:... }
    }
###

class BioLogica.Genotype

  constructor: (genotypeHash) ->
    # copy genotypeHash into @chromosomes
    @chromosomes = {}
    @allAlleles = []
    for own chromosome, sides of genotypeHash
      @chromosomes[chromosome] = {}
      for own side, alleles of sides
        @chromosomes[chromosome][side] = new BioLogica.Chromosome(side, alleles[..])
        @allAlleles = @allAlleles.concat alleles[..]

  containsAlleles: (alleles) ->
    allAllelesCopy = @allAlleles[..]
    (return false unless allAllelesCopy.removeObj(allele)) for allele in alleles
    true
