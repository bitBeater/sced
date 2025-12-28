import { Command } from '@type/command.ts';


export class CommandfailureErr extends Error {

  constructor(readonly failedCommand: Command, readonly result: Deno.CommandOutput) {
    let message = `"${failedCommand.cmd} ${failedCommand.args?.join(' ')}" command failed, with exit code ${result?.code}`;

    if (result.stderr && result.stderr.length) {
      message += '\nstdErr:\t' + new TextDecoder().decode(result.stderr);
    }

    super(message);
  }

}