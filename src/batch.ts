export function splitIntoBatches<Item = unknown>(
  inputArray: Item[],
  batchSize: number
): Item[][] {
  return inputArray.reduce((acc, item, index) => {
    if (index % batchSize === 0) {
      acc.push([])
    }
    acc[acc.length - 1].push(item)
    return acc
  }, [] as Item[][])
}
