fs     = require 'fs'
{exec} = require 'child_process'

config =
  yuic: '../yuicompressor/build/yuicompressor-2.4.7.jar'  # download from http://yuilibrary.com/download/yuicompressor/

appFiles  = [
  'Helpers'
  'Constants'
  'Chromosome'
  'Genotype'
  'Genetics'
  'Phenotype'
  'Organism'
  'BioLogica'
]

speciesFiles = [
  'Dragon'
  'Drake'
  'GenivilleDrake'
  'GGDrake'
  'GGTournamentDrake'
  'GGLizard'
]

task 'compile', 'Build single application file including species', ->
  appContents = new Array remaining = (appFiles.length + speciesFiles.length)
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      console.log "reading src/#{file}.coffee"
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  for file, index in speciesFiles then do (file, index) ->
    fs.readFile "species/#{file}.coffee", 'utf8', (err, fileContents) ->
      console.log "reading species/#{file}.coffee"
      throw err if err
      appContents.push(fileContents)
      process() if --remaining is 0
  process = ->
    fs.writeFile 'dist/biologica.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      console.log 'concatenating all files'
      throw err if err
      exec 'coffee --compile dist/biologica.coffee', (err, stdout, stderr) ->
        console.log 'compiling to js'
        throw err if err
        console.log stdout + stderr
        fs.unlink 'dist/biologica.coffee', (err) ->
          throw err if err
          console.log 'Done.'

task 'compile-without-species', 'Build single application file without species', ->
  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      console.log "reading src/#{file}.coffee"
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'dist/biologica.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      console.log 'concatenating all files'
      throw err if err
      exec 'coffee --compile dist/biologica.coffee', (err, stdout, stderr) ->
        console.log 'compiling to js'
        throw err if err
        console.log stdout + stderr
        fs.unlink 'dist/biologica.coffee', (err) ->
          throw err if err
          console.log 'Done.'


task 'minify', 'minify compiled *.js file', ->
  exec 'java -jar "'+config.yuic+'" dist/biologica.js -o dist/biologica.min.js', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'build', 'Build project to dist/biologica.js and minify to dist/biologica.min.js', ->
  invoke 'compile'
  invoke 'minify'

task 'build-without-species', 'Build project without species to dist/biologica.js and minify to dist/biologica.min.js', ->
  invoke 'compile-without-species'
  invoke 'minify'
