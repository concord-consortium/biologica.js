describe("The species", function() {

  for (speciesName in BioLogica.Species) {
    if (!BioLogica.Species.hasOwnProperty(speciesName)) continue;

    var species = BioLogica.Species[speciesName];

    describe(species.name, function() {

      it ("contains at least one chromosome", function() {
        expect(species.chromosomeNames).toExist();
        expect(species.chromosomeNames.length).toBeGreaterThan(0);
      });

      it ("has all chromosomes with a length of at least one basepair", function() {
        for (var i=0, ii=species.chromosomeNames.length; i<ii; i++) {
          var chromoName = species.chromosomeNames[i];
          expect(species.chromosomesLength[chromoName]).toBeGreaterThan(0);
        }
      });

      it ("has genes on chromosomes", function() {
        for (geneName in species.geneList) {
          if (!species.geneList.hasOwnProperty(geneName)) continue;
          var gene = species.geneList[geneName],
              firstAllele = gene.alleles[0],
              genetics = new BioLogica.Genetics(species, BioLogica.FEMALE, "");

          expect(firstAllele).toExist();
          expect(genetics.findChromosome(firstAllele)).toBeTruthy();
        }
      });

      it ("has genes of length at least one, in a possible position on the chromosome", function() {
        for (geneName in species.geneList) {
          if (!species.geneList.hasOwnProperty(geneName)) continue;
          var gene = species.geneList[geneName],
              firstAllele = gene.alleles[0],
              chromosome = new BioLogica.Genetics(species, BioLogica.FEMALE, "").findChromosome(firstAllele);

          expect(gene.length).toBeGreaterThan(0);
          expect(gene.start).toBeGreaterThan(-1);

          var geneEnd = gene.start + gene.length;
          expect(geneEnd).toBeLessThan(species.chromosomesLength[chromosome] + 1);
        }
      });

      it ("has an alleleLabel for every allele", function() {
        for (geneName in species.geneList) {
          if (!species.geneList.hasOwnProperty(geneName)) continue;
          var gene = species.geneList[geneName];
          for (var j=0, jj=gene.alleles.length; j<jj; j++) {
            var allele = gene.alleles[j];
            console.log("checking "+allele)
            console.log("got "+species.alleleLabelMap[allele])
            expect(species.alleleLabelMap[allele]).toBeDefined();
          }
        }
      });

    });
  }
});