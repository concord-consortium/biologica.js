Array.prototype.remove = (from, to) ->
  rest = this.slice((to || from) + 1 || this.length);
  this.length = if from < 0 then this.length + from else from;
  return this.push.apply(this, rest);

Array.prototype.removeObj = (obj) ->
  i = this.indexOf(obj)
  if ~i
    this.remove(i)
    true
  else
    false


class BioLogica.Genotype

  constructor: (sex, genotypeHash) ->
    # if male, remove the contents XY.b chromosome. NB: this may not be best strategy
    genotypeHash.XY?.b = [] if sex is BioLogica.MALE

    # copy genotypeHash into @chromosomes
    @chromosomes = {}
    @allAlleles = []
    for own chromosome, sides of genotypeHash
      @chromosomes[chromosome] = {}
      for own side, alleles of sides
        @chromosomes[chromosome][side] = alleles[..]
        @allAlleles = @allAlleles.concat alleles[..]

  containsAlleles: (alleles) ->
    allAllelesCopy = @allAlleles[..]
    (return false unless allAllelesCopy.removeObj(allele)) for allele in alleles
    true
