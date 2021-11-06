# node-script-utils

A set of simple utilities for writing scripts in nodejs.

## Installation

npm

```
npm i --save node-script-utils
```

yarn

```
yarn add node-script-utils
```

## Usage

Examples:

```js
import { processInParallel } from 'node-script-utils';

...

const lotsOfRecords = await getLotsOfRecortds()

await processInParallel(lotsOfRecords, processRecordAsync, 10) // process all records 10 records at a time

```

## Utlis

- splitIntoBatches - splits array into batches of cetain size
- processInParallel - executes an async function on each item in an array with a given parallelism number
- createFileLog - stream logs into file
- progress - log progress replacing the same line
- promiseToWait - awaits timeout
- createTiming - track elapsed time and estimate time till completion

## License

MIT
