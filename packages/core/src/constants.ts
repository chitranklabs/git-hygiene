export const ALLOWED_TYPES = [
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
] as const;

export type MetadataType = (typeof ALLOWED_TYPES)[number];

export const PATTERNS = {
  BRANCH: new RegExp(`^(${ALLOWED_TYPES.join('|')})/.+$`),
  TITLE: new RegExp(`^(${ALLOWED_TYPES.join('|')})(\\([a-z0-9-]+\\))?: .+$`),
};
