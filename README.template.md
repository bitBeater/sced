# sced - simple Synchronous Command Execution in Deno

## Table of Contents

- [Introduction](#Introduction)
- [Features](#features)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## Introduction

Sced is a lightweight streamlined package for the Deno runtime that provides a simple way to synchronously execute shell commands and retrieve the output
directly as a string or to pipe to stout.

## Features

- **Execute commands**: Sced allows the execution of shell commands directly from
  your Deno application, and simply retrieve stdout or pipe to deno's stdout.

- **Simple**: Using tagged template literals makes the command syntax
  clean, clear and easy to read.

- **Synchronous**: Sced executes commands synchronously and returns
  the standard output directly.

- **No dependecies**: sced is dependent on the Deno runtime only.

## Limitations
### Sced is synchronous
This means that the execution of commands will block the main thread until the command completes. This can be problematic for long-running commands or commands that require user input. For these cases, consider using Deno's asynchronous capabilities or a different package.

### Vulnerable to [command injection attacks](https://en.wikipedia.org/wiki/Code_injection#Shell_injection)
Sced executes shell commands directly, which can be a security risk if the commands are not properly sanitized. Be sure to validate and sanitize all inputs to prevent [command injection attacks](https://en.wikipedia.org/wiki/Code_injection#Shell_injection).

### No piping
For now sced does not support piping or chaining multiple commands together. This may be added in future versions.</br>
So the following for example will not work:
```ts
const files:string = $s`ls | grep .ts`;

ls: cannot access '|': No such file or directory
ls: cannot access 'grep': No such file or directory
ls: cannot access '.ts': No such file or directory
error: Uncaught (in promise) Error: "ls | grep .ts" command failed, with exit code 2
        throw new CommandfailureErr({ cmd: comand, args, exitCode: cmdOut.code });
```

### No quoted substrings
Sced does not currently support quoted substrings within the tagged template literals.
For now every space is treated as a separator between command and arguments. 
For example:
```ts

const content = $s`cat "my file.txt"`; // This will not work as intended
// It will be parsed in the command 'cat' with two arguments: '"my' and 'file.txt"'
```

## Usage

sced is incredibly straightforward to use. To execute a command, simply use the
`$` function with a tagged template literal containing your command.

### Examples

#### To String

```typescript
import { $s } from "https://deno.land/x/sced@${{version}}/src/mod.ts";

const files:string = $s`ls`;
// files == "deno.jsonc  LICENSE  README.md  src"
```

#### To Stdout

```typescript
import { $$ } from "https://deno.land/x/sced@${{version}}/src/mod.ts";

const exitCode:number = $$`ls`;
// will print to stdout:
// deno.jsonc  LICENSE  README.md  src
```

#### To Uint8Array

```typescript
import { $b } from "https://deno.land/x/sced@${{version}}/src/mod.ts";

const byteArray:Uint8Array = $b`curl https://filesamples.com/samples/image/jpg/sample_640%C3%97426.jpg`;

```
#### To Deno.CommandOutput

```typescript
import { _$ } from "https://deno.land/x/sced@${{version}}/src/mod.ts";

const out:Deno.CommandOutput = _$`echo "Hello, World!"`;
```


## Troubleshooting

For issues related to sced:

- Ensure Deno has the necessary permissions to execute shell commands `--allow-run`.
- Verify that commands are correctly formatted as tagged template literals.
- Check the above limitations section for any potential issues.