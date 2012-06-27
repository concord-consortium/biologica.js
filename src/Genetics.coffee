class BioLogica.Genetics

  constructor: (@species, @alleles, sex) ->
    # create chromosome if a specification is given
    genotypeHash = if (typeof @alleles == "string")
        @convertAlleleStringToGenotypeHash(@alleles, sex)
      else
        @alleles

    # after initial chromosomes are created, fill in any missing genes with random alleles
    @topUpChromosomes(genotypeHash)

    @genotype = new BioLogica.Genotype(genotypeHash)

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
  performMeiosis: ->
    cells = [{}, {}, {}, {}]

    for own chromoName, chromosome of @genotype.chromosomes
      sisterChromatids = []
      for own side, chromatid of chromosome
        newName = @getHaploidChromatidName chromatid
        sisterChromatids.push chromatid.clone(newName)
        sisterChromatids.push chromatid.clone(newName)
      sisterChromatids.shuffle()
      for cell, i in cells
        cell[chromoName] = sisterChromatids[i]
    cells

  getHaploidChromatidName: (chromatid) ->
    if chromatid.name is "b"
      "a"
    else if chromatid.name is "x1" or chromatid.name is "x2"
      "x"
    else chromatid.name

  createGametes: (n) ->
    gametes = []
    gametes = gametes.concat @performMeiosis() for i in [0...Math.floor(n/4)]
    gametes.concat @performMeiosis()[0...(n%4)]


### Class methods (non-instance) ###

###
  Parses the original Java BioLogica allele format and returns an object with a and
  b representing the alleles on each side.
  parseAlleleString("a:h,b:H,a:t,b:t,a:Dl,b:D") =>
    { a: ["h", "t", "Dl"], b: ["H", "t", "D"] }
###
BioLogica.Genetics.parseAlleleString = (alleleString) ->
  a: alleleString.match(/a:([^,])*/g)?.map (short) -> short.match(/[^:]+$/)[0]
  b: alleleString.match(/b:([^,])*/g)?.map (short) -> short.match(/[^:]+$/)[0]