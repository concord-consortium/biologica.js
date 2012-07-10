# [BioLogica.js](https://github.com/concord-consortium/biologica.js)

A genetics library for creating and breeding organisms with genotypes and phenotypes. This library simulates
genes, chromosomes, meiosis, cross-over, and multiple types of inheritance.

The library originally evolved from the [BioLogica](http://biologica.concord.org/) Java project created by
the [Concord Consortium](http://www.concord.org/)

## Compiling Coffeecript

The library is written in CoffeeScript, with JavaScript compiled to the /dist folder. To compile the src
code, first install coffeescript via Node. This should also install cake. Then

    cd biologica.js
    cake compile

This will concatenate the source code and convert it to JS, and place the single file biologica.js in the dist folder.

To compile and minify in one step

    cake build

This will place both biologica.js and biologica.min.js in the dist folder.

You can also use 'cake compile-without-species' or 'cake build-without-species' to create a version of
the library that does not contain any species files.

## License

BioLogica.js is Copyright 2012 (c) by the Concord Consortium and is distributed under
any of the following licenses:

- [Simplified BSD](http://www.opensource.org/licenses/BSD-2-Clause),
- [MIT](http://www.opensource.org/licenses/MIT), or
- [Apache 2.0](http://www.opensource.org/licenses/Apache-2.0).