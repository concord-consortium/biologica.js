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

  constructor: (species, genotypeHash, @sex) ->
    # copy genotypeHash into @chromosomes
    @chromosomes = {}
    @allAlleles = []
    for own chromosome, sides of genotypeHash
      @chromosomes[chromosome] = {}
      for own side, alleles of sides
        if side is "y" then alleles = []
        @chromosomes[chromosome][side] = new BioLogica.Chromosome(species, chromosome, side, alleles[..])
        @allAlleles = @allAlleles.concat alleles[..]
    @sex ?= if @chromosomes.XY?.y? then BioLogica.MALE else BioLogica.FEMALE

  containsAlleles: (alleles) ->
    allAllelesCopy = @allAlleles[..]
    allAllelesCopy.push "Y" if @sex is BioLogica.MALE   # add a fake 'Y' allele
    (return false unless allAllelesCopy.removeObj(allele)) for allele in alleles
    true

  replaceAllele: (chromosome, allele, newAllele) ->
    chromosome.alleles.replaceFirst allele, newAllele
    @allAlleles.replaceFirst allele, newAllele        # this is safe because allAlleles is order-agnostic

  # returns a: b: style string of genotype
  getAlleleString: ->
    alleleString = ""
    for own c, chromosomes of @chromosomes
      for own side, chromosome of chromosomes
        alleles = chromosome.alleles
        otherSide = if side is "x" then "y" else if side is "x1" then "x2" else "b"
        if (side is "x" or side is "x1") then side = "a"
        if side isnt "a" then continue
        for allele, i in alleles
          alleleString += "#{side}:#{allele},"
          if chromosomes[otherSide]
            alleleString += "b:#{chromosomes[otherSide]?.alleles[i]},"


    alleleString.substring(0,alleleString.length-1)