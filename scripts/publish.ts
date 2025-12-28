#!/usr/bin/env -S deno run -A

import * as denoConf from '../deno.json' with { type: 'json' };
import { $$ } from '../src/sced.ts';

const version = denoConf.default.version;
const tagName = `v${version}`;
console.log(`\n\npublishing version `, version, '\n');

console.log('formatting...')
$$`deno fmt`

console.log('linting...')
$$`deno lint`

console.log('testing...')
$$`deno test -A`




$$`deno task mkreadme`;
$$`deno task repocheck`;

$$`git tag -a ${tagName}  -m ${tagName}`;
$$`git push origin ${tagName}`;
console.log(`\n\nversion ${version} successfully published`);
