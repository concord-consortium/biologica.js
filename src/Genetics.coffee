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
        chromoName = @findChromosome allele
        continue unless chromoName
        sides = @getSides(chromoName, sex)
        genotypeHash[chromoName][if side == "a" then sides[0] else sides[1]].push allele
    genotypeHash

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
    gene is indeicated by an example allele.
    isAlleleOfGene("dl", "D") => true
    isAlleleOfGene("rh", "D") => false
  ###
  isAlleleOfGene: (allele, exampleOfGene) ->
    for own gene of @species.geneList
      allelesOfGene = @species.geneList[gene].alleles
      if allele in allelesOfGene && exampleOfGene in allelesOfGene
        return true
    false

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
    Returns four haploid cells, without crossover for now
  ###
  performMeiosis: (performCrossover) ->
    cells = [{}, {}, {}, {}]

    for own chromoName, chromosomes of @genotype.chromosomes
      sisterChromatids = {}
      sisterChromatidIds = ["b2", "b1", "a2", "a1"]
      containsYchromosome = false
      for own side, chromosome of chromosomes
        newSide = @getHaploidChromatidSide chromosome
        sisterChromatids[sisterChromatidIds.pop()] = chromosome.clone(newSide)
        sisterChromatids[sisterChromatidIds.pop()] = chromosome.clone(newSide)
        containsYchromosome = true if side is "y"
      @crossover sisterChromatids if performCrossover and !containsYchromosome
      sisterChromatidIds = ["b2", "b1", "a2", "a1"].shuffle()
      for cell, i in cells
        cell[chromoName] = sisterChromatids[sisterChromatidIds[i]]
    cells

  getHaploidChromatidSide: (chromatid) ->
    if chromatid.side is "b"
      "a"
    else if chromatid.side is "x1" or chromatid.side is "x2"
      "x"
    else chromatid.side

  crossover: (sisterChromatids) ->
    crossoverPoints = @createCrossoverPoints sisterChromatids.a1
    for point in crossoverPoints
      # pick chromatids to cross
      startSide = ["a1", "a2"][ExtMath.flip()]
      endSide   = ["b1", "b2"][ExtMath.flip()]
      newChromatids = @crossChromatids(sisterChromatids[startSide], sisterChromatids[endSide], point)
      sisterChromatids[startSide] = newChromatids[0]
      sisterChromatids[endSide]   = newChromatids[1]

  crossChromatids: (chr1, chr2, point) ->
    return [
      BioLogica.Chromosome.createChromosome(chr2, chr1, point)
      BioLogica.Chromosome.createChromosome(chr1, chr2, point)
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
      crossoverPoints.remove(ExtMath.randomInt crossoverPoints.length)
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