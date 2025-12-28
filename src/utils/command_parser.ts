import { templateToString } from '@bitbeater/ecma-utils/strings';
import { MalformedComand } from '@error/malformed_comand.ts';
import { Command } from '@type/command.ts';
import { TemplateExpression } from '@type/template.ts';

/**
 * parse the comand and the arguments into a Command object.
 * example:
 * ```ts
 * const command = parseComand('deno run -A ./src/sced.ts -h');
 * /** 
 *  command =  {
 *     cmd: 'deno', 
 *     args: ['run', '-A', './src/sced.ts', '-h'] 
 * }
 * ```
 * @param command
 * @returns
 */
export function stringToCommand(command: string): Command {
  const comandParts = command.split(/\s+/g);
  const cmd = comandParts.shift();

  if (!cmd) {
    throw new MalformedComand('malformed comand: ' + command);
  }

  return { cmd, args: comandParts };
}


/**
 * convert a template string to a Deno.Command.
 * example:
 * ```ts
 * const cmd = templateToCommand`deno run -A ./src/sced.ts -h`;
 * /** 
 *  command =  {
 *     cmd: 'deno', 
 *     args: ['run', '-A', './src/sced.ts', '-h'] 
 * }
 * @param templateParts 
 * @param templateSubsts 
 * @returns 
 */

export function templateToCommand(templateParts: TemplateStringsArray, templateSubsts: TemplateExpression[]): Command {
  const strCommand = templateToString(templateParts, ...templateSubsts);
  const command = stringToCommand(strCommand)

  return command;
}