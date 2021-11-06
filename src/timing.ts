export function createTiming(
  formatMs: (milliseconds: number) => string = defaultFormatFn
) {
  const startTime = Date.now()

  function getEstimateTimeMessage(completed: number, remaining: number) {
    return `~${formatMs(getEstimateInMs(completed, remaining))}`
  }

  function getEstimateInMs(completed: number, remaining: number) {
    const millisecondsSinceStart = getElapsedMs()
    const millisecondsPerItem = millisecondsSinceStart / completed
    const remainingMs = remaining * millisecondsPerItem
    return remainingMs
  }

  function getElapsedTimeMessage() {
    return formatMs(getElapsedMs())
  }

  function getElapsedMs() {
    return Date.now() - startTime
  }

  return {
    getEstimateInMs,
    getEstimateTimeMessage,
    getElapsedTimeMessage,
    getElapsedMs,
  }
}

export function defaultFormatFn(durationInMs: number) {
  const seconds = Math.round(durationInMs / 1000)
  const minutes = Math.floor(seconds / 60)
  return `${minutes} minutes ${seconds - minutes * 60} seconds`
}
