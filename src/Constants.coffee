window.BioLogica = {}

BioLogica.FEMALE  = 1
BioLogica.MALE    = 0

BioLogica.combinations = (arr) ->
  result = []
  currentOpts = arr[0]
  if arr.length == 1
    return currentOpts.slice(0)
  combos = BioLogica.combinations(arr.slice(1))
  for combo in combos
    if typeof combo == "string"
      combo = [combo]
    for opts in currentOpts
      r = combo.slice(0)
      r.unshift(opts)
      result.push(r)
  return result.slice(0)
