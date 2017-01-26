class BioLogica.Genetics

  constructor: (@species, @alleles, sex) ->
    # create chromosome if a specification is given
    genotypeHash = if (typeof @alleles == "string")
        @convertAlleleStringToGenotypeHash(@alleles, sex)
      else
        @alleles

    # after initial chromosomes are created, fill in any missing genes with random alleles
    @topUpChromosomes(genotypeHash)

    @genotype = new BioLogica.Genotype(@species, genotypeHash, sex)

  ###
    Converts an alleleString to a genotype hash
    e.g. convertAlleleStringToChromosomes("a:t,b:t,a:h,b:H,a:Dl", female) =>
      {"1": {a: ["t"], b: ["t"]}, "2": {a: ["h"], b: ["H"]}, "XY": {x1: ["Dl"]}}
    Also supports limited options for alleles, e.g. "a:T/Tk" or b:x/y/z
  ###
  convertAlleleStringToGenotypeHash: (alleleString, sex) ->
    split = BioLogica.Genetics.parseAlleleString alleleString
    genotypeHash = {}
    for chromoName in @species.chromosomeNames
      genotypeHash[chromoName] = {}
      sides = @getSides(chromoName, sex)
      genotypeHash[chromoName][sides[0]] = []
      genotypeHash[chromoName][sides[1]] = []
    for own side, alleles of split
      continue unless alleles
      for allele in alleles
        if (~allele.indexOf("/")) then allele = @selectOption allele
        chromoName = @findChromosome allele
        continue unless chromoName
        sides = @getSides(chromoName, sex)
        genotypeHash[chromoName][if side == "a" then sides[0] else sides[1]].push allele
    genotypeHash

  selectOption: (alleles) ->
    alleleOptions = (allele.trim() for allele in alleles.split("/"))
    rand = Math.floor Math.random() * alleleOptions.length
    alleleOptions[rand]

  getAlleleString: ->
    @genotype.getAlleleString()


  getAlleleStringForTrait: (trait) ->
    genes = []
    allAlleles = []
    for own characteristic, alleles of @species.traitRules[trait]
      allAlleles = allAlleles.concat alleles.reduce (a,b) ->
        a.concat(b)
      , []

    # get only the unique values
    allAlleles = allAlleles.reduce (p, c) ->
      if p.indexOf(c) < 0
        p.push(c)
      return p
    , []

    # get the unique gene values
    for a in allAlleles
      gene = @geneForAllele(a)
      if gene not in genes
        genes.push(@geneForAllele(a))

    @genotype.getAlleleString(genes, @)

  ###
    "tops-up" the chromosomes: fills in any missing genes with random alleles.
    At the moment this assumes that all chromosomes have been specified, even if they
    don't all have all the possible genes
  ###
  topUpChromosomes: (genotypeHash) ->
    for own chromoName, chromosome of genotypeHash
      genes = @species.chromosomeGeneMap[chromoName]
      for gene in genes
        for own side of chromosome
          unless @chromosomeContainsGene(genotypeHash[chromoName][side], gene) or side is "y"
            genotypeHash[chromoName][side].push @getRandomAllele(gene)

  getSides: (chromoName, sex) ->
    if chromoName isnt "XY" then ["a", "b"] else
      if sex == BioLogica.FEMALE then ["x1", "x2"] else ["x","y"]

  ###
    Returns true if the allele passed is a member of the gene, where the
    gene is indicated by an example allele.
    isAlleleOfGene("dl", "D") => true
    isAlleleOfGene("rh", "D") => false
  ###
  isAlleleOfGene: (allele, exampleOfGene) ->
    for own gene of @species.geneList
      allelesOfGene = @species.geneList[gene].alleles
      if allele in allelesOfGene && exampleOfGene in allelesOfGene
        return true
    false

  geneForAllele: (allele) ->
    for own gene of @species.geneList
      allelesOfGene = @species.geneList[gene].alleles
      if allele in allelesOfGene
        return gene

  ###
    Finds the chromosome that a given allele is part of
  ###
  findChromosome: (allele) ->
    for chromosome, genes of @species.chromosomeGeneMap
      for gene in genes
        return chromosome if @isAlleleOfGene(allele, gene)
    false

  ###
    Returns true if chromosome array contains any allele of the gene
  ###
  chromosomeContainsGene: (chromosome, exampleOfGene) ->
    for allele in chromosome
      return true if @isAlleleOfGene(allele, exampleOfGene)
    false

  ###
    Returns random allele of the gene
  ###
  getRandomAllele: (exampleOfGene) ->
    for own gene of @species.geneList
      _allelesOfGene = @species.geneList[gene].alleles
      if exampleOfGene in _allelesOfGene
        allelesOfGene = _allelesOfGene
        break
    rand = Math.floor Math.random() * allelesOfGene.length
    allelesOfGene[rand]

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

  ###
    Returns four haploid cells, with optional crossover
  ###
  performMeiosis: (performCrossover) ->
    cells = [{}, {}, {}, {}]

    crossInfo = {}
    endCellInfo = {}
    for own chromoName, chromosomes of @genotype.chromosomes
      sisterChromatids = {}
      sisterChromatidIds = ["b2", "b1", "a2", "a1"]
      containsYchromosome = false
      for own side, chromosome of chromosomes
        sisterChromatids[sisterChromatidIds.pop()] = chromosome.clone()
        sisterChromatids[sisterChromatidIds.pop()] = chromosome.clone()
        containsYchromosome = true if side is "y"
      cross = null
      cross = @crossover sisterChromatids if performCrossover and !containsYchromosome
      sisterChromatidIds = arrayShuffle ["b2", "b1", "a2", "a1"]
      endCellInfo[chromoName] = {}
      for cell, i in cells
        chromaId = sisterChromatidIds[i]
        chroma = sisterChromatids[chromaId]
        chroma.side = @getHaploidChromatidSide chroma unless performCrossover
        cell[chromoName] = chroma
        endCellInfo[chromoName][chromaId] = i
        # translate the cross info chromatidIds to the cell indexes
        if cross?
          for j in [0...cross.length]
            cr = cross[j]
            cr.start_cell = i if cr.start == chromaId
            cr.end_cell = i if cr.end == chromaId
      crossInfo[chromoName] = cross
    return {cells: cells, crossInfo: crossInfo, endCellInfo: endCellInfo}

  getHaploidChromatidSide: (chromatid) ->
    if chromatid.side is "b"
      "a"
    else if chromatid.side is "x1" or chromatid.side is "x2"
      "x"
    else chromatid.side

  crossover: (sisterChromatids) ->
    crossoverPoints = @createCrossoverPoints sisterChromatids.a1
    crossovers = []
    for point in crossoverPoints
      # pick chromatids to cross
      startSide = ["a1", "a2"][ExtMath.flip()]
      endSide   = ["b1", "b2"][ExtMath.flip()]
      newChromatids = @crossChromatids(sisterChromatids[startSide], sisterChromatids[endSide], point)
      sisterChromatids[startSide] = newChromatids[0]
      sisterChromatids[endSide]   = newChromatids[1]
      crossovers.push {start: startSide, end: endSide, point: point, crossedAlleles: newChromatids[0].crossedAlleles.slice(0)}
    return crossovers

  crossChromatids: (chr1, chr2, point) ->
    return [
      BioLogica.Chromosome.createChromosome(chr1, chr2, point)
      BioLogica.Chromosome.createChromosome(chr2, chr1, point)
    ]

  ###
    Create an array of locations (in base pairs) where the parent pair of chromosomes will cross

    First, randomly select the 10 cM segments that will experience crossover events. Give every 10 cM
    segment of the chromosome an independent probability of 0.2 of experiencing a crossover. This will
    result in having between 0 and num_10cM_segments crossover events. If the number of crossover events
    is greater than three then randomly drop all but three of the crossover events.

    For each remaining event, determine the exact location of the crossover using a uniform random
    distribution from the start to the end of the 10 cM segment.
  ###
  createCrossoverPoints: (chromatid) ->
    totalDeciMorgans = Math.floor chromatid.lengthInCentimorgans / 10;
    crossoverPoints = (i for i in [0...totalDeciMorgans] when Math.random() < 0.2)
    while crossoverPoints.length > 3
      crossoverPoints.splice((ExtMath.randomInt crossoverPoints.length), 1)
    lengthOfDM = chromatid.getlengthInBasePairs() / totalDeciMorgans
    for crossoverPoint, i in crossoverPoints
      positionOnDM = ExtMath.randomInt lengthOfDM
      crossoverPoints[i] = (crossoverPoint * lengthOfDM) + positionOnDM
    crossoverPoints

### Class methods (non-instance) ###

###
  Parses the original Java BioLogica allele format and returns an object with a and
  b representing the alleles on each side.
  parseAlleleString("a:h,b:H,a:t,b:t,a:Dl,b:D") =>
    { a: ["h", "t", "Dl"], b: ["H", "t", "D"] }
###
BioLogica.Genetics.parseAlleleString = (alleleString) ->
  a: alleleString.match(/a:([^,])*/g)?.map (str) -> str.match(/[^:]+$/)?[0]
  b: alleleString.match(/b:([^,])*/g)?.map (str) -> str.match(/[^:]+$/)?[0]

BioLogica.Genetics.getGeneOfAllele = (species, allele) ->
  for own geneName, gene of species.geneList
    if ~gene.alleles.indexOf allele
      gene.name = geneName
      return gene
