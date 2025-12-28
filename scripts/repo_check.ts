#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run
import {
    Confirm,
    Input,
} from 'cliffy/prompt/mod.ts';
import { $$ } from '../src/sced.ts';

import chalk from 'chalk';
import { simpleGit, SimpleGit } from 'simple-git';


const git: SimpleGit = simpleGit();
const not_added = (await git.status()).not_added;


if (not_added.length) {
    console.log(`\n\n\nthe following files are not added:\n${chalk.gray(not_added.join('\n'))}\n\n`);

    for (const untrackedFile of not_added) {
        const message = chalk.green('add ') + chalk.gray(untrackedFile)
        const shouldAdd = await Confirm.prompt({ message, default: false });
        if (shouldAdd) await git.add(untrackedFile);
    }
}


const staged = (await git.status()).staged;

if (staged.length) {
    console.log(`\n\n\nthe following files are staged:\n${chalk.yellow(staged.join('\n'))}\n\n`);

    for (const modifiedFile of staged) {
        const message = chalk.green('commit ') + chalk.gray(modifiedFile)
        const shouldAdd = await Confirm.prompt({ message, default: false });
        if (shouldAdd) await git.commit(await Input.prompt({ message: chalk.gray('commit message'), default: modifiedFile }), modifiedFile);
    }
}




const modified = (await git.status()).modified;

if (modified.length) {
    console.log(`\n\n\nthe following files are modified:\n${chalk.yellow(modified.join('\n'))}\n\n`);

    for (const modifiedFile of modified) {
        const message = chalk.green('commit ') + chalk.gray(modifiedFile)
        const shouldAdd = await Confirm.prompt({ message, default: false });
        if (shouldAdd) git.commit(await Input.prompt({ message: chalk.gray('commit message'), default: modifiedFile }), modifiedFile);
    }
}

const deleted = (await git.status()).deleted;

if (deleted.length) {
    console.log(`\n\n\nthe following files are deleted:\n${chalk.red(deleted.join('\n'))}\n\n`);

    for (const deletedFile of deleted) {
        const message = chalk.red('commit ') + chalk.gray(deletedFile)
        const shouldAdd = await Confirm.prompt({ message, default: false });
        if (shouldAdd) git.commit(await Input.prompt({ message: chalk.gray('commit message'), default: deletedFile }), deletedFile);
    }
}

$$`git push`;