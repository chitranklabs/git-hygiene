#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import pc from 'picocolors';
import {
  validateBranch,
  validateTitle,
  validateCommit,
  getRecommendedBump,
} from '@chitrank2050/git-hygiene-core';
import type { ValidationResult } from '@chitrank2050/git-hygiene-core';

const HELP_TEXT = `
${pc.bold('git-hygiene')} 🌊
The ultimate zero-dependency metadata validator.

${pc.bold('Usage:')}
  $ git-hygiene <command> [options]

${pc.bold('Commands:')}
  ${pc.cyan('branch')}          Validate current Git branch name
  ${pc.cyan('title <text>')}    Validate a PR title string
  ${pc.cyan('commit <text>')}   Validate a commit message string
  ${pc.cyan('bump')}            Suggest the next semantic version

${pc.bold('Options:')}
  --json            Output result as JSON (useful for CI)
  --help, -h        Show this help message
  --version, -v     Show version number
`;

async function main() {
  try {
    const { values, positionals } = parseArgs({
      options: {
        help: { type: 'boolean', short: 'h' },
        version: { type: 'boolean', short: 'v' },
        json: { type: 'boolean' },
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
        const branchToValidate =
          arg || execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
        report(await validateBranch(branchToValidate), !!values.json);
        break;
      }
      case 'title': {
        if (!arg) {
          console.error(pc.red('❌ Error: PR title is required.'));
          process.exit(1);
        }
        report(await validateTitle(arg), !!values.json);
        break;
      }
      case 'commit': {
        if (!arg) {
          console.error(pc.red('❌ Error: Commit message or file path is required.'));
          process.exit(1);
        }

        let messageToValidate = arg;

        // If the argument is a file path (like .git/COMMIT_EDITMSG), read it
        if (fs.existsSync(arg) && fs.statSync(arg).isFile()) {
          messageToValidate = fs.readFileSync(arg, 'utf8').trim();
        }

        report(await validateCommit(messageToValidate), !!values.json);
        break;
      }
      case 'bump': {
        const { releaseType, reason, level } = await getRecommendedBump();

        if (values.json) {
          console.log(JSON.stringify({ releaseType, reason, level }));
        } else {
          console.log(`\n${pc.bold('Recommended Bump:')} ${pc.green(pc.underline(releaseType))}`);
          console.log(`${pc.dim('Reason:')} ${reason}\n`);
        }
        process.exit(0);
        break;
      }
      default:
        console.error(pc.red(`❌ Unknown command: ${command}`));
        process.exit(1);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(pc.red(`❌ Fatal Error: ${msg}`));
    process.exit(1);
  }
}

function report(result: ValidationResult, isJson: boolean = false) {
  if (isJson) {
    console.log(JSON.stringify(result));
    process.exit(result.valid ? 0 : 1);
  }

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
