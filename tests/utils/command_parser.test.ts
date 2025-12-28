import { assertEquals } from '@std/assert/mod.ts';
import { describe, it } from '@std/testing/bdd.ts';
import { stringToCommand } from '../../src/utils/command_parser.ts';






describe('Command parser', () => {

    describe('exeToBytes', () => {
        it('it should parse the command', () => {
            const strCommand = `printf hello`;
            const command = stringToCommand(strCommand);

            assertEquals(command, { cmd: 'printf', args: ['hello'] })
        });
    });
});




