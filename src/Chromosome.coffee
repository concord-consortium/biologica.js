class BioLogica.Chromosome

  constructor: (@species, @chromosome, @side, @alleles) ->

  clone: (newSide) ->
    new BioLogica.Chromosome(@species, @chromosome, newSide or @side, @alleles[..])

  lengthInCentimorgans: 100

  getlengthInBasePairs: ->
    @species.chromosomesLength[@chromosome]

  getGeneOfAllele: (allele) ->
    for own geneName, gene of @species.geneList
      return geneName if ~gene.alleles.indexOf allele

  getAllelesPosition: (allele) ->
    geneName = @getGeneOfAllele allele
    @species.geneList[geneName].start

BioLogica.Chromosome.createChromosome = (chr1, chr2, crossPoint) ->
  newAlleles = []
  for allele, i in chr1.alleles
    if chr1.getAllelesPosition(allele) < crossPoint
      newAlleles.push allele
    else
      newAlleles.push chr2.alleles[i]
  new BioLogica.Chromosome(chr1.species, chr1.chromosome, chr1.side, newAlleles)