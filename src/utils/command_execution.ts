import { Command } from '@type/command.ts';
import { CommandfailureErr } from '@error/command_failure.ts';

/**
 * run a comand and return the stdout as a string.
 * @param cmd
 * @param args
 * @returns
 */
export function exeToBytes(command: Command): Uint8Array {
  const cmdOut = runCommand(command);
  return cmdOut.stdout;
}

/**
 * run a comand and return the stdout as a string.
 * @param cmd
 * @param args
 * @returns
 */
export function exeToString(command: Command): string {
  const commandOut = exeToBytes(command);
  return new TextDecoder().decode(commandOut);
}

/**
 * run a command and return the exit code.
 * stdOut and stdErr are printed to the console.
 * @param cmd
 * @param args
 * @returns
 */
export function exeToStdOut(command: Command): number {
  const cmdOut = runCommand({ ...command, stdout: 'inherit', stderr: 'inherit', stdin: 'inherit' });

  return cmdOut.code;
}

export function runCommand(command: Command): Deno.CommandOutput {
  const cmd = new Deno.Command(command.cmd, command);
  const output = cmd.outputSync();

  if (!output.success) {
    throw new CommandfailureErr(command, output);
  }

  return output;
}

// export function exe(comand: string, ...args: string[]): Deno.ChildProcess {
//   const command = new Deno.Command(comand, { args, stdout: 'piped', stderr: 'piped' });
//   return command.spawn();
// }

// /**
//  * run a command and return the exit code.
//  * stdOut and stdErr are printed to the console.
//  * @param cmd
//  * @param args
//  * @returns
//  */
// export function chain(commands: string[][]): Deno.ChildProcess {
//   let lastChildProcess: Deno.ChildProcess;

//   for (const command of commands) {
//     const childProcess = exe(command[0], ...command.slice(1));
//     if (lastChildProcess) {
//       lastChildProcess.stdout.pipeTo(childProcess.stdin);
//     }
//     lastChildProcess = childProcess;
//   }

//   return lastChildProcess;
// }
