import fs from 'node:fs';
import path from 'node:path';
import type { GitHygieneConfig, ResolvedConfig } from './types.ts';
import { DEFAULT_CONFIG } from './constants.ts';

let cachedConfig: ResolvedConfig | null = null;

/**
 * @description
 * Loads the user's config from package.json and merges it with the defaults.
 * Dynamically generates the Regex patterns to enforce Unity across the tool.
 *
 * @returns {ResolvedConfig} The fully resolved and compiled configuration
 */
export function loadConfig(): ResolvedConfig {
  if (cachedConfig) return cachedConfig;

  let userConfig: Partial<GitHygieneConfig> = {};

  try {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg['git-hygiene']) {
        userConfig = pkg['git-hygiene'];
      }
    }
  } catch {
    // Silently fallback to defaults if package.json is missing or invalid
  }

  const mergedConfig: GitHygieneConfig = {
    types: userConfig.types || DEFAULT_CONFIG.types,
    ignoreBranches: userConfig.ignoreBranches || DEFAULT_CONFIG.ignoreBranches,
    maxHeaderLength: userConfig.maxHeaderLength || DEFAULT_CONFIG.maxHeaderLength,
    maxBodyLength: userConfig.maxBodyLength || DEFAULT_CONFIG.maxBodyLength,
    minBodyLength: userConfig.minBodyLength || DEFAULT_CONFIG.minBodyLength,
    typeCase: userConfig.typeCase || DEFAULT_CONFIG.typeCase,
    scopeCase: userConfig.scopeCase || DEFAULT_CONFIG.scopeCase,
    allowEmptyScope: userConfig.allowEmptyScope ?? DEFAULT_CONFIG.allowEmptyScope,
    subjectFullStop: userConfig.subjectFullStop || DEFAULT_CONFIG.subjectFullStop,
  };

  const typesPattern = mergedConfig.types.join('|');
  const branchesPattern = mergedConfig.ignoreBranches.join('|');

  const scopePattern = mergedConfig.allowEmptyScope ? '(\\([a-z0-9-]+\\))?' : '(\\([a-z0-9-]+\\))';
  cachedConfig = {
    ...mergedConfig,
    patterns: {
      branch: new RegExp(`^(${branchesPattern})$|^(${typesPattern})/.+$`),
      title: new RegExp(`^(${typesPattern})${scopePattern}: .+$`),
    },
  };

  return cachedConfig;
}

/**
 * @description
 * Helper for testing environments to force a configuration reload.
 */
export function clearConfigCache(): void {
  cachedConfig = null;
}
