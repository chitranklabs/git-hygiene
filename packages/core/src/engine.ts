import lint from '@commitlint/lint';
import { loadConfig } from './config.ts';
import type { ValidationResult } from './types.ts';
import { createRequire } from 'node:module';
import { Bumper } from 'conventional-recommended-bump';

const require = createRequire(import.meta.url);

/**
 * @description
 * Validates a Git branch name against the loaded configuration.
 * Automatically accepts configured base branches (e.g., 'main').
 *
 * @param branchName - The raw string name of the branch to validate
 * @returns {Promise<ValidationResult>} The status and messaging of the validation
 */
export async function validateBranch(branchName: string): Promise<ValidationResult> {
  const config = await loadConfig();
  const isValid = config.patterns.branch.test(branchName);

  if (isValid) return { valid: true, message: `Branch name "${branchName}" is valid.` };

  return {
    valid: false,
    message: `Invalid branch name: "${branchName}"`,
    actual: branchName,
    expected: `Base branch (${config.ignoreBranches.join('|')}) OR <type>/<description> (Types: ${config.types.join(', ')})`,
  };
}

/**
 * @description
 * Validates a Pull Request title against the loaded configuration.
 *
 * @param title - The PR title to validate (e.g., 'feat: add login')
 * @returns {Promise<ValidationResult>} The status and messaging of the validation
 */
export async function validateTitle(title: string): Promise<ValidationResult> {
  const config = await loadConfig();
  const isValid = config.patterns.title.test(title);

  if (isValid) return { valid: true, message: `PR title "${title}" is valid.` };

  return {
    valid: false,
    message: `Invalid PR title: "${title}"`,
    actual: title,
    expected: `type(scope?): description (Types: ${config.types.join(', ')})`,
  };
}

/**
 * @description
 * Validates a commit message using the underlying @commitlint/lint engine
 * configured with the dynamic types from our loaded config.
 *
 * @param message - The multi-line commit message
 * @returns {Promise<ValidationResult>} The status and messaging of the validation
 */
export async function validateCommit(message: string): Promise<ValidationResult> {
  const config = await loadConfig();

  const rules: Record<string, unknown> = {
    'type-enum': [2, 'always', config.types],
    'type-case': [2, 'always', config.typeCase],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', config.scopeCase],
    'scope-empty': [config.allowEmptyScope ? 0 : 2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, config.subjectFullStop, '.'],
    'header-max-length': [2, 'always', config.maxHeaderLength],
    'body-max-line-length': [2, 'always', config.maxBodyLength],
    'body-min-length': [2, 'always', config.minBodyLength],
    ...config.rules,
  };

  const lintOpts: { parserOpts?: unknown } = {};
  if (config.parserPreset) {
    const preset =
      typeof config.parserPreset === 'string' ? require(config.parserPreset) : config.parserPreset;

    // Handle presets that are functions (like conventional-changelog-conventionalcommits)
    if (typeof preset === 'function') {
      lintOpts.parserOpts = await preset();
    } else {
      // Normalize parserOpts from various preset formats
      lintOpts.parserOpts = preset.parserOpts || preset.parser || preset;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const report = await lint(message, rules as any, lintOpts as any);
  if (report.valid) return { valid: true, message: 'Commit message is valid.' };

  const errors = report.errors.map((err: { message: string; name: string }) => ({
    message: err.message,
    name: err.name,
  }));

  const messageSummary = errors.map((err: { message: string }) => ` - ${err.message}`).join('\n');
  return {
    valid: false,
    message: `Invalid commit message:\n${messageSummary}`,
    errors,
  };
}

/**
 * @description
 * Suggests the next semantic version bump based on the commit history
 * since the last tag.
 *
 * @returns {Promise<{ releaseType: string; reason: string; level: number }>} The recommended bump info
 */
export async function getRecommendedBump(): Promise<{
  releaseType: string;
  reason: string;
  level: number;
}> {
  const config = await loadConfig();
  const bumper = new Bumper(process.cwd());

  if (config.parserPreset) {
    // If it's a function (dynamic preset), execute it and use the resulting config
    if (typeof config.parserPreset === 'function') {
      const preset = await config.parserPreset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      bumper.config(preset as any);
    }
    // If it's already a resolved object, use it
    else if (typeof config.parserPreset === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      bumper.config(config.parserPreset as any);
    }
    // If it's a string, load it as a named preset
    else {
      await bumper.loadPreset(config.parserPreset);
    }
  }

  return (await bumper.bump()) as { releaseType: string; reason: string; level: number };
}
