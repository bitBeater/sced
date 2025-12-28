import { assertEquals } from 'https://deno.land/std@0.223.0/assert/assert_equals.ts';
import { describe, it } from 'https://deno.land/std@0.223.0/testing/bdd.ts';
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




