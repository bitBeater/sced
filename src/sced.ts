import { TemplateExpression } from '@type/template.ts';
import { exeToBytes, exeToStdOut, exeToString, runCommand } from '@util/command_execution.ts';
import { templateToCommand } from '@util/command_parser.ts';


/**
 * execute a command and return the stdout as a string.
 * @param command
 * @returns
 */
export function $s(command: TemplateStringsArray, ...expressions: TemplateExpression[]): string {
  const cmd = templateToCommand(command, expressions);
  return exeToString(cmd);
}

/**
 * execute a command and return the exit code.
 * stdOut and stdErr are printed to the console.
 * @param command
 * @returns
 */
export function $$(command: TemplateStringsArray, ...expressions: TemplateExpression[]): number {
  const cmd = templateToCommand(command, expressions);
  return exeToStdOut(cmd);
}

/**
 * execute a command and return the stdout as a byte array.
 * @param command
 * @returns
 */
export function $b(command: TemplateStringsArray, ...expressions: TemplateExpression[]): Uint8Array {
  const cmd = templateToCommand(command, expressions);
  return exeToBytes(cmd);
}

/**
 * execute a command and return the Deno.CommandOutput.
 * @param command
 * @param expressions
 * @returns 
 */
export function _$(command: TemplateStringsArray, ...expressions: TemplateExpression[]): Deno.CommandOutput {
  const cmd = templateToCommand(command, expressions);
  return runCommand(cmd);
}