import lint from '@commitlint/lint';
import { loadConfig } from './config.ts';
import type { ValidationResult } from './types.ts';

/**
 * @description
 * Validates a Git branch name against the loaded configuration.
 * Automatically accepts configured base branches (e.g., 'main').
 *
 * @param branchName - The raw string name of the branch to validate
 * @returns {ValidationResult} The status and messaging of the validation
 */
export function validateBranch(branchName: string): ValidationResult {
  const config = loadConfig();
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
 * @returns {ValidationResult} The status and messaging of the validation
 */
export function validateTitle(title: string): ValidationResult {
  const config = loadConfig();
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
  const config = loadConfig();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rules: any = {
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
  };

  const report = await lint(message, rules);
  if (report.valid) return { valid: true, message: 'Commit message is valid.' };

  const errors = report.errors.map((err: { message: string }) => ` - ${err.message}`).join('\n');
  return { valid: false, message: `Invalid commit message:\n${errors}` };
}
