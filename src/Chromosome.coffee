class BioLogica.Chromosome

  constructor: (@species, @chromosome, side, alleles) ->
    seenGenes = []
    @alleles = alleles.sort((a,b)=>
      return if @getAllelesPosition(a) > @getAllelesPosition(b) then 1 else -1
    ).filter (item)=>
      gene = @getGeneOfAllele(item)
      if seenGenes.indexOf(gene) != -1
        console.warn("Duplicate allele found: " + item) if console?
        return false
      seenGenes.push(gene)
      return true

    if typeof(side) is "object"
      @side = side[0]
    else
      @side = side

    @allelesWithSides = []
    for i in [0...@alleles.length]
      al = @alleles[i]
      s = if typeof(side) is "object" then side[i] else @side
      @allelesWithSides.push {allele: al, side: s}

  clone: (newSide) ->
    new BioLogica.Chromosome(@species, @chromosome, newSide or @side, @alleles[..])

  lengthInCentimorgans: 100

  getlengthInBasePairs: ->
    @species.chromosomesLength[@chromosome]

  getGeneOfAllele: (allele) ->
    return BioLogica.Genetics.getGeneOfAllele(@species, allele)?.name

  getAllelesPosition: (allele) ->
    geneName = @getGeneOfAllele allele
    @species.geneList[geneName]?.start or -1

  replaceAllele: (prevAllele, newAllele) ->
    index = @alleles.indexOf(prevAllele)
    @alleles[index] = newAllele if (index >= 0)

BioLogica.Chromosome.createChromosome = (chr1, chr2, crossPoint) ->
  newAlleles = []
  newSides = []
  crossedAlleles = []
  for allele, i in chr1.alleles
    if chr1.getAllelesPosition(allele) < crossPoint
      newAlleles.push allele
      newSides.push chr1.allelesWithSides[i].side
    else
      newAlleles.push chr2.alleles[i]
      newSides.push chr2.allelesWithSides[i].side
      crossedAlleles.push [allele, chr2.alleles[i]]
  chromo = new BioLogica.Chromosome(chr1.species, chr1.chromosome, newSides, newAlleles)
  chromo.crossedAlleles = crossedAlleles
  return chromo
