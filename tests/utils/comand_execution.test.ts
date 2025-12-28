import { assertEquals } from 'https://deno.land/std@0.223.0/assert/assert_equals.ts';
import { describe, it } from 'https://deno.land/std@0.223.0/testing/bdd.ts';
import { exeToBytes, exeToStdOut, exeToString } from '../../src/utils/command_execution.ts';







describe('Command Execution', () => {

    describe('exeToBytes', () => {
        it('should return the output of a command as a byte array', () => {
            const printVal = 'hello';

            const output = exeToBytes({ cmd: 'printf', args: [printVal] });
            const expected = new TextEncoder().encode(printVal);
            assertEquals(output, expected);
        });
    });


    describe('exeToString', () => {
        it('should return the output of a command as a string', () => {
            const printVal = 'hello';
            const output = exeToString({ cmd: 'printf', args: [printVal] });
            assertEquals(output, printVal);
        });
    });

    describe('exeToStdOut', () => {
        it(`should pipe the comand's stdout to deno's stdout`, () => {
            const exitCode = exeToStdOut({ cmd: 'printf', args: ['hello'] });
            assertEquals(exitCode, 0);
        });
    });
});


