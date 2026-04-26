#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import pc from 'picocolors';
import { validateBranch, validateTitle, validateCommit } from '@git-hygiene/core';

const HELP_TEXT = `
${pc.bold('git-hygiene')} 🌊
The ultimate zero-dependency metadata validator.

${pc.bold('Usage:')}
  $ git-hygiene <command> [options]

${pc.bold('Commands:')}
  ${pc.cyan('branch')}          Validate current Git branch name
  ${pc.cyan('title <text>')}    Validate a PR title string
  ${pc.cyan('commit <text>')}   Validate a commit message string

${pc.bold('Options:')}
  --help, -h        Show this help message
  --version, -v     Show version number
`;

async function main() {
  try {
    const { values, positionals } = parseArgs({
      options: {
        help: { type: 'boolean', short: 'h' },
        version: { type: 'boolean', short: 'v' },
      },
      allowPositionals: true,
      strict: false,
    });

    if (values.help || positionals.length === 0) {
      console.log(HELP_TEXT);
      return;
    }

    const command = positionals[0];
    const arg = positionals[1];

    switch (command) {
      case 'branch': {
        const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        report(validateBranch(currentBranch));
        break;
      }
      case 'title': {
        if (!arg) {
          console.error(pc.red('❌ Error: PR title is required.'));
          process.exit(1);
        }
        report(validateTitle(arg));
        break;
      }
      case 'commit': {
        if (!arg) {
          console.error(pc.red('❌ Error: Commit message is required.'));
          process.exit(1);
        }
        report(await validateCommit(arg));
        break;
      }
      default:
        console.error(pc.red(`❌ Unknown command: ${command}`));
        process.exit(1);
    }
  } catch (err: any) {
    console.error(pc.red(`❌ Fatal Error: ${err.message}`));
    process.exit(1);
  }
}

function report(result: any) {
  if (result.valid) {
    console.log(`${pc.green('✅')} ${result.message}`);
    process.exit(0);
  } else {
    console.error(`${pc.red('❌')} ${pc.bold(result.message)}`);
    if (result.expected) {
      console.error(`${pc.dim('   Expected:')} ${pc.yellow(result.expected)}`);
    }
    process.exit(1);
  }
}

main();
