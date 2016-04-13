# [BioLogica.js](https://github.com/concord-consortium/biologica.js)

A genetics library for creating and breeding organisms with genotypes and phenotypes. This library simulates
genes, chromosomes, meiosis, cross-over, and multiple types of inheritance.

The library originally evolved from the [BioLogica](http://biologica.concord.org/) Java project created by
the [Concord Consortium](http://www.concord.org/).

## Compiling CoffeeScript

The library is written in CoffeeScript, with JavaScript compiled to the /dist folder. To compile the src
code, first install coffeescript (including cake) and yuicompressor via Node:

    npm install -g coffee-script  # install coffee and cake globally
    npm install                   # install yuicompressor locally

Then

    cd biologica.js
    cake compile

This will concatenate the source code and convert it to JavaScript, and place the single file biologica.js in the dist folder.

To compile and minify in one step

    cake build

This will place both biologica.js and biologica.min.js in the dist folder.

You can also use 'cake compile-without-species' or 'cake build-without-species' to create a version of
the library that does not contain any species files.

A previous version of BioLogica.js relied on several extensions to the JavaScript Array prototype. BioLogica.js
itself no longer relies on these extensions, but they are still included in the library for compatibility with
clients that may be using them. Their use has been deprecated, however, and a build option is provided for
building BioLogica.js without them:

    cake --excludeArrayExtensions [compile|build]

or

    cake -x [compile|build]

will compile or build BioLogica.js without the Array extensions.

## Tests

Tests can be run by loading the file test/SpecRunner.html into a browser. One way to accomplish this
is to install the local-web-server package:

    npm install -g local-web-server
    ws --spa test/SpecRunner.html

and then direct the browser to the following URL:

    http://127.0.0.1:8000/test/SpecRunner.html 

## License

BioLogica.js is Copyright (c) 2012-2016 by the Concord Consortium and is distributed under
any of the following licenses:

- [Simplified BSD](http://www.opensource.org/licenses/BSD-2-Clause),
- [MIT](http://www.opensource.org/licenses/MIT), or
- [Apache 2.0](http://www.opensource.org/licenses/Apache-2.0).
