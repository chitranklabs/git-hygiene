import { GitHygieneConfig } from './types.ts';

/**
 * @description
 * The out-of-the-box standard configuration for git-hygiene.
 * Adheres to the Conventional Commits specification.
 */
export const DEFAULT_CONFIG: GitHygieneConfig = {
  types: [
    'feat',
    'fix',
    'chore',
    'docs',
    'style',
    'refactor',
    'perf',
    'test',
    'build',
    'ci',
    'revert',
    'maintenance',
  ],
  ignoreBranches: ['main', 'master', 'development', 'gh-pages'],
} as const;
