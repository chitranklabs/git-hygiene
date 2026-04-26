import lint from '@commitlint/lint';
import { ALLOWED_TYPES, PATTERNS } from './constants.ts';

export interface ValidationResult {
  valid: boolean;
  message: string;
  actual?: string;
  expected?: string;
}

export function validateBranch(branchName: string): ValidationResult {
  const isValid = PATTERNS.BRANCH.test(branchName);
  if (isValid) return { valid: true, message: `Branch name "${branchName}" is valid.` };
  return {
    valid: false,
    message: `Invalid branch name: "${branchName}"`,
    actual: branchName,
    expected: `<type>/<description> (Types: ${ALLOWED_TYPES.join(', ')})`,
  };
}

export function validateTitle(title: string): ValidationResult {
  const isValid = PATTERNS.TITLE.test(title);
  if (isValid) return { valid: true, message: `PR title "${title}" is valid.` };
  return {
    valid: false,
    message: `Invalid PR title: "${title}"`,
    actual: title,
    expected: `type(scope?): description (Types: ${ALLOWED_TYPES.join(', ')})`,
  };
}

export async function validateCommit(message: string): Promise<ValidationResult> {
  const rules: any = {
    'type-enum': [2, 'always', ALLOWED_TYPES],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  };

  const report = await lint(message, rules);
  if (report.valid) return { valid: true, message: 'Commit message is valid.' };

  const errors = report.errors.map(err => ` - ${err.message}`).join('\n');
  return { valid: false, message: `Invalid commit message:\n${errors}` };
}
