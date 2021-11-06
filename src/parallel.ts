export async function processInParallel<Item = unknown>(
  items: Item[],
  processFunction: (item: Item, index?: number) => Promise<void>,
  parallelism: number
): Promise<void> {
  let nextIndex = 0
  const lastIndex = items.length - 1
  async function process() {
    while (nextIndex <= lastIndex) {
      const index = nextIndex
      nextIndex += 1
      const item = items[index]
      await processFunction(item, index)
    }
  }

  const promises: Promise<void>[] = []

  for (let i = 0; i < parallelism; i += 1) {
    promises.push(process())
  }

  await Promise.all(promises)
}
