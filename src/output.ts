import { createWriteStream, existsSync, mkdirSync } from "fs"
import { format } from "util"

export function createFileLog({
  dir,
  filename = `${new Date().toISOString()}`,
  extension = "txt",
  alsoLogTo,
}: {
  dir: string
  filename?: string
  extension?: string
  alsoLogTo?: (output: unknown) => void | Promise<void>
}) {
  const dirWithoutEndSlash =
    dir[dir.length - 1] === "/" ? dir.slice(0, -1) : dir
  ensureDirExists(dirWithoutEndSlash)
  const extensionWithoutDot =
    extension[0] === "." ? extension.slice(1) : extension
  const logFile = createWriteStream(
    `${dirWithoutEndSlash}/${filename}.${extensionWithoutDot}`,
    { flags: "w" }
  )

  return function log(output: unknown) {
    const formatted = format(output)
    logFile.write(`${formatted}\n`)
    if (typeof alsoLogTo === "function") {
      alsoLogTo(formatted)
    }
  }
}

function ensureDirExists(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }
}

function printProgress(text: string) {
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
  process.stdout.write(text)
}

function endProgress() {
  process.stdout.clearLine(0)
  process.stdout.cursorTo(0)
}

export const progress = {
  log: printProgress,
  end: endProgress,
}
