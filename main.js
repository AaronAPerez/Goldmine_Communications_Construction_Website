const worker = new Worker('/worker.js')
worker.postMessage(data)
worker.onmessage = (e) => {
  setResult(e.data)
}

// Break up long tasks
function processLargeDataset(data) {
  const batchSize = 100
  let index = 0
  
  function processBatch() {
    const batch = data.slice(index, index + batchSize)
    // Process batch
    index += batchSize
    
    if (index < data.length) {
      setTimeout(processBatch, 0) // Yield to browser
    }
  }
  
  processBatch()
}