self.onmessage = function(e) {
  const result = heavyComputation(e.data)
  self.postMessage(result)
}