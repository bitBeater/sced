
import { assertEquals, assert } from '@std/assert/mod.ts';
import { describe, it } from '@std/testing/bdd.ts';
import { $$, $b, $s, _$ } from '../src/sced.ts';




describe('Command Execution', () => {

    describe('exeToBytes', () => {
        it('should return the output of a command as a byte array', () => {

            const output = $b`printf hello`;
            const expected = new TextEncoder().encode('hello');
            assertEquals(output, expected);
        });

        it('should return the output of a template command as a byte array', () => {

            const value = 'hello';
            const output = $b`printf ${value}`;
            const expected = new TextEncoder().encode(value);

            assertEquals(output, expected);
        });
    });


    describe('exeToString', () => {
        it('should return the output of a command as a string', () => {

            const output = $s`printf hello`
            assertEquals(output, 'hello');
        });

        it('should return the output of a template command as a string', () => {

            const value = 'hello';
            const output = $s`printf ${value}`;
            assertEquals(output, value);
        });
    });


    describe('exeToStdOut', () => {
        it(`should pipe the comand's stdout to deno's stdout`, () => {
            const exitCode = $$`echo hello`;
            assertEquals(exitCode, 0);
        });

        it(`should pipe the templates comand's stdout to deno's stdout`, () => {
            const value = 'hello';
            const exitCode = $$`echo ${value}`;
            assertEquals(exitCode, 0);
        });
    });

    describe('exe to Deno.Command', () => {
        it(`should return a Deno.Command`, () => {
            const commandOutput = _$`echo hello`;
            assert(commandOutput);
            assert(commandOutput.stdout instanceof Uint8Array);
        });

        it(`should have the correct stdout`, () => {
            const value = 'hello';
            const commandOutput = _$`echo ${value}`;
            const outputString = new TextDecoder().decode(commandOutput.stdout);
            assertEquals(outputString.trim(), value);
        });

        it(`should have the correct exit code (0)`, () => {
            const commandOutput = _$`echo`;
            assertEquals(commandOutput.code, 0);
        });
    });
});


