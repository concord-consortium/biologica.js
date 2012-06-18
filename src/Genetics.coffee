class BioLogica.Genetics

  constructor: (@species, @alleles) ->

  convertAlleleStringToChromosomes = (alleleString) ->
    @chromosomes = {}
    @chromosomes[chromoName] = {} for chromoName in @species.chromosomes

    for own alleleSpec in alleleString.split(",")
      split = alleleSpec.split(":")
      side = split[0]
      allele = split[1]

  ###
    Returns true if the allele passed is a member of the gene, where the
    gene is indeicated by an example allele.
    isAlleleOfGene("dl", "D") => true
    isAlleleOfGene("rh", "D") => false
  ###
  isAlleleOfGene: (allele, exampleOfGene) ->
    for own gene of @species.geneList
      allelesOfGene = @species.geneList[gene]
      if allele in allelesOfGene && exampleOfGene in allelesOfGene
        return true
    false

  findChromosome: (allele) ->
    for chromosome, alleles of @species.chromosomeAllelesMap
      return chromosome if allele in alleles

  ###
    Given an array of alleles and an array of genes, filter the alleles to return only
    those alleles that are included in the array of genes.
    filter(["Tk", "m", "W", "dl"], ["T", "D"]) => ["Tk", "dl"]
  ###
  filter: (alleles, filter) ->
    alleles.filter (allele) =>
      for gene in filter
        if @isAlleleOfGene(allele, gene)
          return true
      false

### Class methods (non-instance) ###

###
  Parses the original Java BioLogica allele format and returns an object with a and
  b representing the alleles on each side.
  parseAlleleString("a:h,b:H,a:t,b:t,a:Dl,b:D") =>
    { a: ["h", "t", "Dl"], b: ["H", "t", "D"] }
###
BioLogica.Genetics.parseAlleleString = (alleleString) ->
  a: alleleString.match(/a:([^,])*/g).map (short) -> short.match(/[^:]+$/)[0]
  b: alleleString.match(/b:([^,])*/g).map (short) -> short.match(/[^:]+$/)[0]